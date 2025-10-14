import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DynamicFormConfigUploader } from '@/components/dynamic-form-config-uploader/dynamic-form-config-uploader';
import { DynamicForm } from '@/components/dynamic-form/dynamic-form';
import { SubmittedDataViewer } from '@/components/submitted-data-viewer/submitted-data-viewer';
import { DynamicFormService } from '@/services/dynamic-form-service';

@Component({
  selector: 'app-dynamic-form-page',
  imports: [CardModule, DynamicFormConfigUploader, DynamicForm, SubmittedDataViewer],
  templateUrl: './dynamic-form-page.html',
  styleUrl: './dynamic-form-page.scss',
})
export class DynamicFormPage {
  constructor(private dynamicFormService: DynamicFormService) {}

  get dynamicFormSchema() {
    return this.dynamicFormService.dynamicFormSchema;
  }

  get dynamicFormData() {
    return this.dynamicFormService.dynamicFormData;
  }
}
