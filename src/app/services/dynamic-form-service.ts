import { FormSchema } from '@/types/form-schema.type';
import { Injectable, signal } from '@angular/core';

type FormValue = string | number | boolean | Date

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  dynamicFormSchema = signal<FormSchema | null>(null);
  dynamicFormData = signal<Array<{ name: string; value: FormValue }>>([]);

  setDynamicFormData(data: Record<string, FormValue> | null) {
    if (!data) {
      this.dynamicFormData.set([]);
      return;
    };

    const formData = Object.entries(data).map(([key, value]) => ({ name: key, value }));
    
    this.dynamicFormData.set([...formData]);
  }
}
