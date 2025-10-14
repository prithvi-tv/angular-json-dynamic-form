import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPage } from '@/pages/dynamic-form-page/dynamic-form-page';

describe('DynamicForm', () => {
  let component: DynamicFormPage;
  let fixture: ComponentFixture<DynamicFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
