import { DynamicFormService } from '@/services/dynamic-form-service';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-submitted-data-viewer',
  imports: [TableModule],
  templateUrl: './submitted-data-viewer.html',
  styleUrl: './submitted-data-viewer.scss'
})
export class SubmittedDataViewer {
  constructor(private dynamicFormService: DynamicFormService) { }

  get dynamicFormData() {
    return this.dynamicFormService.dynamicFormData;
  }
}
