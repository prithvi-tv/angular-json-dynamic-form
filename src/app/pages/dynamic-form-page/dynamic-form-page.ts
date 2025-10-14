import dynamicFormData from '@/data/form.json';
import { FormSchema } from '@/types/form-schema.type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dynamic-form-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    Button
  ],
  templateUrl: './dynamic-form-page.html',
  styleUrl: './dynamic-form-page.scss'
})
export class DynamicFormPage implements OnInit {
  dynamicFormSchema!: FormSchema
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.dynamicFormSchema = dynamicFormData as FormSchema;
    this.buildDynamicForm();
  }

  private buildDynamicForm(): void {
    if (!this.dynamicFormSchema) return;

    const formControls: Record<string, [string | boolean | string[], ValidatorFn[]]> = {};

    this.dynamicFormSchema.fields.forEach(field => {
      const validators: ValidatorFn[] = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validation?.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }

      let defaultValue: string | boolean | string[] = '';
      if (field.type === 'checkbox') {
        defaultValue = false;
      } else if (field.type === 'multiselect') {
        defaultValue = [];
      }

      formControls[field.name] = [defaultValue, validators];
    });

    this.form = this.formBuilder.group(formControls);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

  public getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    const field = this.dynamicFormSchema.fields.find(field => field.name === fieldName);

    if (!control || !control.errors || !control.touched) {
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
