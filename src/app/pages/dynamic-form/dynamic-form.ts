import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { Checkbox } from 'primeng/checkbox';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import dynamicFormConfig from '@/data/form.json'
import { FormSchema } from '@/types/form-schema.type';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    DatePicker,
    Select,
    MultiSelect,
    Checkbox,
    Textarea,
    Button,
    CardModule
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit {
  dynamicForm: FormSchema | null = null;

  public ngOnInit(): void {
    this.dynamicForm = dynamicFormConfig as FormSchema;
  }
}
