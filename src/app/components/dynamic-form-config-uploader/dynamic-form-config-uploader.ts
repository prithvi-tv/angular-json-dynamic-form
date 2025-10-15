import { DynamicFormService } from '@/services/dynamic-form-service';
import { FormSchema } from '@/types/form-schema.type';
import { Component, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-dynamic-form-config-uploader',
  imports: [FileUploadModule, Button],
  templateUrl: './dynamic-form-config-uploader.html',
  styleUrl: './dynamic-form-config-uploader.scss',
})
export class DynamicFormConfigUploader {
  errorMessage = signal<string | null>(null);

  constructor(private dynamicFormService: DynamicFormService) {}

  async onSubmit(event: Event) {
    event.preventDefault();

    this.errorMessage.set(null);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const jsonString = formData.get('dynamicFormJson') as string;

    if (!jsonString || jsonString.trim() === '') {
      this.errorMessage.set('Please enter JSON data');
      return;
    }

    try {
      const parsedData = JSON.parse(jsonString);
      const isValid = this.dynamicFormService.validateFormSchema(parsedData);
      if (!isValid) {
        this.errorMessage.set('Invalid JSON format. Please check your schema structure.');
        return;
      }
      const validatedSchema: FormSchema = parsedData;
      this.dynamicFormService.dynamicFormSchema.set(validatedSchema);
      console.log('Form schema successfully uploaded and validated:', validatedSchema);
      form.reset();
    } catch (error) {
      this.errorMessage.set('Invalid JSON syntax. Please check your JSON formatting.');
    }
  }

  onTextareaInput() {
    if (this.errorMessage()) {
      this.errorMessage.set(null);
    }
  }
}
