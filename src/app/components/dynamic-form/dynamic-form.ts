import { DynamicFormService } from '@/services/dynamic-form-service';
import { FormSchema } from '@/types/form-schema.type';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    Button,
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm implements OnInit, OnChanges {
  @Input() dynamicFormSchema: FormSchema | null = null;
  form: FormGroup | null = null;

  constructor(private formBuilder: FormBuilder, private dynamicFormService: DynamicFormService) {}

  ngOnInit(): void {
    this.buildDynamicForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicFormSchema'] && !changes['dynamicFormSchema'].firstChange) {
      this.buildDynamicForm();
    }
  }

  isFieldVisible(fieldName: string): boolean {
    if (!this.dynamicFormSchema || !this.form) return true;

    const field = this.dynamicFormSchema.fields.find((f) => f.name === fieldName);
    if (!field?.conditional) return true;

    const parentControl = this.form.get(field.conditional.parentFieldName);
    if (!parentControl) return false;

    const parentValue = parentControl.value;
    const expectedValue = field.conditional.parentFieldValue;
    const isVisible = parentValue === expectedValue;

    const control = this.form.get(fieldName);
    if (control) {
      if (isVisible) {
        const currentValidators = control.validator;
        if (!currentValidators) {
          const validators = this.getFieldValidators(field);
          control.setValidators(validators);
          control.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        control.setValidators([]);
        control.setValue(
          field.type === 'checkbox' ? false : field.type === 'multiselect' ? [] : ''
        );
        control.updateValueAndValidity({ emitEvent: false });
      }
    }

    return isVisible;
  }

  private getFieldValidators(field: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.validation?.pattern) {
      validators.push(Validators.pattern(field.validation.pattern));
    }

    return validators;
  }

  private buildDynamicForm(): void {
    if (!this.dynamicFormSchema) return;

    const formControls: Record<string, [string | boolean | string[], ValidatorFn[]]> = {};

    this.dynamicFormSchema.fields.forEach((field) => {
      let defaultValue: string | boolean | string[] = '';
      if (field.type === 'checkbox') {
        defaultValue = false;
      } else if (field.type === 'multiselect') {
        defaultValue = [];
      }

      const validators = field.conditional ? [] : this.getFieldValidators(field);
      formControls[field.name] = [defaultValue, validators];
    });

    this.form = this.formBuilder.group(formControls);
  }

  public onSubmit(): void {
    if (!this.form) return;

    if (this.form.valid) {
      this.dynamicFormService.setDynamicFormData(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  public getErrorMessage(fieldName: string): string {
    if (!this.form) return '';

    const control = this.form.get(fieldName);
    const field = this.dynamicFormSchema?.fields.find((field) => field.name === fieldName);

    if (!control || !control.errors || !control.touched || control.disabled) {
      return '';
    }

    if (control.errors['required']) {
      return `${field?.label} is required`;
    }

    if (control.errors['pattern'] && field?.validation?.message) {
      return field.validation.message;
    }

    return 'Invalid value';
  }
}
