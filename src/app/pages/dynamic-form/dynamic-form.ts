import dynamicFormConfig from '@/data/form.json';
import { FormSchema } from '@/types/form-schema.type';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
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
