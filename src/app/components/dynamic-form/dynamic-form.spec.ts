import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DynamicForm } from './dynamic-form';
import { DynamicFormService } from '@/services/dynamic-form-service';
import { FormSchema } from '@/types/form-schema.type';

describe('DynamicForm', () => {
  let component: DynamicForm;
  let fixture: ComponentFixture<DynamicForm>;
  let mockFormService: jasmine.SpyObj<DynamicFormService>;

  beforeEach(async () => {
    const formServiceSpy = jasmine.createSpyObj('DynamicFormService', ['setDynamicFormData']);

    await TestBed.configureTestingModule({
      imports: [DynamicForm, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        FormBuilder,
        { provide: DynamicFormService, useValue: formServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicForm);
    component = fixture.componentInstance;
    mockFormService = TestBed.inject(DynamicFormService) as jasmine.SpyObj<DynamicFormService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form when schema is provided', () => {
    const schema: FormSchema = {
      title: 'Test Form',
      fields: [{ name: 'testField', label: 'Test Field', type: 'text', required: true }],
    };

    component.dynamicFormSchema = schema;
    component.ngOnInit();

    expect(component.form).not.toBeNull();
    expect(component.form?.get('testField')).toBeTruthy();
  });

  it('should render form title', () => {
    const schema: FormSchema = {
      title: 'Registration Form',
      fields: [],
    };

    component.dynamicFormSchema = schema;
    fixture.detectChanges();

    const formCard = fixture.debugElement.query(By.css('[data-testid="dynamic-form-card"]'));
    expect(formCard).toBeTruthy();

    const titleElement = fixture.debugElement.nativeElement.textContent;
    expect(titleElement).toContain('Registration Form');
  });

  it('should render input fields based on schema', () => {
    const schema: FormSchema = {
      title: 'Test Form',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'text', required: false },
      ],
    };

    component.dynamicFormSchema = schema;
    component.ngOnInit();
    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('[data-testid="input-name"]'));
    const emailInput = fixture.debugElement.query(By.css('[data-testid="input-email"]'));
    const nameContainer = fixture.debugElement.query(
      By.css('[data-testid="field-container-name"]')
    );
    const emailContainer = fixture.debugElement.query(
      By.css('[data-testid="field-container-email"]')
    );

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(nameContainer).toBeTruthy();
    expect(emailContainer).toBeTruthy();
  });

  it('should render submit button', () => {
    const schema: FormSchema = {
      title: 'Test Form',
      fields: [{ name: 'name', label: 'Name', type: 'text', required: true }],
    };

    component.dynamicFormSchema = schema;
    component.ngOnInit();
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('[data-testid="dynamic-form"]'));
    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
    const resetButton = fixture.debugElement.query(By.css('[data-testid="reset-button"]'));

    expect(formElement).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(resetButton).toBeTruthy();
  });

  it('should show "No Form Schema" message when no schema provided', () => {
    component.dynamicFormSchema = null;
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('[data-testid="dynamic-form"]'));
    expect(formElement).toBeFalsy();

    const formCard = fixture.debugElement.query(By.css('[data-testid="dynamic-form-card"]'));
    expect(formCard).toBeTruthy();

    const noSchemaText = fixture.debugElement.nativeElement.textContent;
    expect(noSchemaText).toContain('No Form Schema');
  });

  it('should call service when form is submitted with valid data', () => {
    const schema: FormSchema = {
      title: 'Test Form',
      fields: [{ name: 'name', label: 'Name', type: 'text', required: true }],
    };

    component.dynamicFormSchema = schema;
    component.ngOnInit();

    component.form?.patchValue({ name: 'John Doe' });

    component.onSubmit();

    expect(mockFormService.setDynamicFormData).toHaveBeenCalledWith({ name: 'John Doe' });
  });

  it('should not call service when form is invalid', () => {
    const schema: FormSchema = {
      title: 'Test Form',
      fields: [{ name: 'name', label: 'Name', type: 'text', required: true }],
    };

    component.dynamicFormSchema = schema;
    component.ngOnInit();

    component.onSubmit();

    expect(mockFormService.setDynamicFormData).not.toHaveBeenCalled();
  });
});
