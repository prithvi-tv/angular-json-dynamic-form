import { FormSchema, FieldType } from '@/types/form-schema.type';
import { Injectable, signal } from '@angular/core';

type FormValue = string | number | boolean | Date;

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
    }
    const formData = Object.entries(data).map(([key, value]) => ({ name: key, value }));
    this.dynamicFormData.set([...formData]);
  }

  validateFormSchema(data: unknown): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }
    const schema = data as Record<string, unknown>;

    if (!schema['title'] || typeof schema['title'] !== 'string' || schema['title'].trim() === '') {
      return false;
    }

    if (!schema['fields'] || !Array.isArray(schema['fields'])) {
      return false;
    }

    if (schema['fields'].length === 0) {
      return false;
    }
    return schema['fields'].every((field: unknown) => this.validateFormField(field));
  }

  private validateFormField(field: unknown): boolean {
    if (!field || typeof field !== 'object') {
      return false;
    }
    const fieldObj = field as Record<string, unknown>;

    if (
      !fieldObj['label'] ||
      typeof fieldObj['label'] !== 'string' ||
      fieldObj['label'].trim() === ''
    ) {
      return false;
    }
    if (
      !fieldObj['name'] ||
      typeof fieldObj['name'] !== 'string' ||
      fieldObj['name'].trim() === ''
    ) {
      return false;
    }

    const validFieldTypes: FieldType[] = [
      'text',
      'date',
      'dropdown',
      'multiselect',
      'checkbox',
      'textarea',
    ];
    if (!fieldObj['type'] || !validFieldTypes.includes(fieldObj['type'] as FieldType)) {
      return false;
    }

    if (fieldObj['required'] !== undefined && typeof fieldObj['required'] !== 'boolean') {
      return false;
    }

    if (
      fieldObj['placeholder'] !== undefined &&
      (typeof fieldObj['placeholder'] !== 'string' || fieldObj['placeholder'].trim() === '')
    ) {
      return false;
    }

    if (fieldObj['type'] === 'dropdown' || fieldObj['type'] === 'multiselect') {
      if (
        !fieldObj['options'] ||
        !Array.isArray(fieldObj['options']) ||
        fieldObj['options'].length === 0
      ) {
        return false;
      }
      if (!fieldObj['options'].every((option: unknown) => typeof option === 'string')) {
        return false;
      }
    }

    if (fieldObj['validation'] !== undefined) {
      if (!this.validateFieldValidation(fieldObj['validation'])) {
        return false;
      }
    }

    if (fieldObj['conditional'] !== undefined) {
      if (!this.validateConditional(fieldObj['conditional'])) {
        return false;
      }
    }

    return true;
  }

  private validateFieldValidation(validation: unknown): boolean {
    if (!validation || typeof validation !== 'object') {
      return false;
    }

    const validationObj = validation as Record<string, unknown>;

    if (!validationObj['pattern'] || typeof validationObj['pattern'] !== 'string') {
      return false;
    }

    if (
      !validationObj['message'] ||
      typeof validationObj['message'] !== 'string' ||
      validationObj['message'].trim() === ''
    ) {
      return false;
    }

    return true;
  }

  private validateConditional(conditional: unknown): boolean {
    if (!conditional || typeof conditional !== 'object') {
      return false;
    }

    const conditionalObj = conditional as Record<string, unknown>;

    if (
      !conditionalObj['parentFieldName'] ||
      typeof conditionalObj['parentFieldName'] !== 'string' ||
      conditionalObj['parentFieldName'].trim() === ''
    ) {
      return false;
    }

    if (conditionalObj['parentFieldValue'] === undefined) {
      return false;
    }

    const value = conditionalObj['parentFieldValue'];
    const isValidType =
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number' ||
      value instanceof Date ||
      (Array.isArray(value) &&
        value.every(
          (v: unknown) =>
            typeof v === 'string' ||
            typeof v === 'boolean' ||
            typeof v === 'number' ||
            v instanceof Date
        ));

    return isValidType;
  }
}
