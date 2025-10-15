import {TestBed} from '@angular/core/testing';
import {DynamicFormService} from './dynamic-form-service';
import {provideZonelessChangeDetection} from '@angular/core';

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
});
