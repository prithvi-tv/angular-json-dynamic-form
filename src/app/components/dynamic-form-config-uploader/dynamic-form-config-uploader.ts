import { Component, ViewChild } from '@angular/core';
import { Button } from "primeng/button";
import { FileUploadModule, FileUpload } from "primeng/fileupload";
import { DynamicFormService } from "@/services/dynamic-form-service";
import { FormSchema } from "@/types/form-schema.type";

@Component({
  selector: 'app-dynamic-form-config-uploader',
  imports: [FileUploadModule, Button],
  templateUrl: './dynamic-form-config-uploader.html',
  styleUrl: './dynamic-form-config-uploader.scss'
})
export class DynamicFormConfigUploader {
  @ViewChild('fu') fileUpload!: FileUpload;

  constructor(private dynamicFormService: DynamicFormService) { }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.fileUpload.files && this.fileUpload.files.length > 0) {
      const file = this.fileUpload.files[0];


      try {
        const jsonContent = await this.readFileAsText(file);
        const formConfig: FormSchema = JSON.parse(jsonContent);
        this.dynamicFormService.dynamicFormSchema.set(formConfig);
        this.fileUpload.clear();

      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    }
  }

  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }
}
