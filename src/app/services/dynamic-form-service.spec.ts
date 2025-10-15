import { TestBed } from '@angular/core/testing';
import { DynamicFormService } from './dynamic-form-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DynamicFormService', () => {
  let service: DynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(DynamicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store form submission data', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    };

    service.setDynamicFormData(formData);

    const result = service.dynamicFormData();
    expect(result).toContain({ name: 'name', value: 'John Doe' });
    expect(result).toContain({ name: 'email', value: 'john@example.com' });
    expect(result).toContain({ name: 'age', value: 30 });
  });

  it('should clear form data when null is passed', () => {
    service.setDynamicFormData({ field: 'value' });

    service.setDynamicFormData(null);
    expect(service.dynamicFormData()).toEqual([]);
  });

  it('should handle empty form submission', () => {
    service.setDynamicFormData({});
    expect(service.dynamicFormData()).toEqual([]);
  });

  describe('Validation Of Dynamic Form Schema', () => {
    it('should return true for valid schema', () => {
      const validSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Name',
            name: 'name',
            type: 'text',
            required: true,
          },
        ],
      };

      expect(service.validateFormSchema(validSchema)).toBe(true);
    });

    it('should return false for null or undefined data', () => {
      expect(service.validateFormSchema(null)).toBe(false);
      expect(service.validateFormSchema(undefined)).toBe(false);
    });

    it('should return false for non-object data', () => {
      expect(service.validateFormSchema('string')).toBe(false);
      expect(service.validateFormSchema(123)).toBe(false);
      expect(service.validateFormSchema(true)).toBe(false);
    });

    it('should return false for missing title', () => {
      const invalidSchema = {
        fields: [{ label: 'Name', name: 'name', type: 'text' }],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });

    it('should return false for empty title', () => {
      const invalidSchema = {
        title: '',
        fields: [{ label: 'Name', name: 'name', type: 'text' }],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });

    it('should return false for empty fields array', () => {
      const invalidSchema = {
        title: 'Test Form',
        fields: [],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });

    it('should return false for invalid field type', () => {
      const invalidSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Name',
            name: 'name',
            type: 'invalid-type',
          },
        ],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });

    it('should return false for field missing required properties', () => {
      const invalidSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Name',
          },
        ],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });

    it('should validate dropdown fields with options', () => {
      const validSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Gender',
            name: 'gender',
            type: 'dropdown',
            options: ['Male', 'Female', 'Other'],
          },
        ],
      };

      expect(service.validateFormSchema(validSchema)).toBe(true);
    });

    it('should return false for dropdown without options', () => {
      const invalidSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Gender',
            name: 'gender',
            type: 'dropdown',
          },
        ],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });

    it('should validate field with validation object', () => {
      const validSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Email',
            name: 'email',
            type: 'text',
            validation: {
              pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
              message: 'Invalid email',
            },
          },
        ],
      };

      expect(service.validateFormSchema(validSchema)).toBe(true);
    });

    it('should validate field with conditional object', () => {
      const validSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Other Details',
            name: 'other',
            type: 'text',
            conditional: {
              parentFieldName: 'hasOther',
              parentFieldValue: true,
            },
          },
        ],
      };

      expect(service.validateFormSchema(validSchema)).toBe(true);
    });

    it('should return false for invalid conditional object', () => {
      const invalidSchema = {
        title: 'Test Form',
        fields: [
          {
            label: 'Other Details',
            name: 'other',
            type: 'text',
            conditional: {
              parentFieldName: '',
              parentFieldValue: true,
            },
          },
        ],
      };

      expect(service.validateFormSchema(invalidSchema)).toBe(false);
    });
  });
});
