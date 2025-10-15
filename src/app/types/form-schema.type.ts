export interface FieldValidation {
  pattern: string;
  message: string;
}

export type FieldType = 'text' | 'date' | 'dropdown' | 'multiselect' | 'checkbox' | 'textarea';

export interface FormField {
  label: string;
  name: string;
  type: FieldType;
  required?: boolean;
  validation?: FieldValidation;
  options?: string[];
  placeholder?: string;
  conditional?: {
    parentFieldName: string;
    parentFieldValue: string | boolean | number | Date | Array<string | boolean | number | Date>;
  }
}

export interface FormSchema {
  title: string;
  fields: FormField[];
}
