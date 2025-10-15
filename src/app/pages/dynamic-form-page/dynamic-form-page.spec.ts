import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormPage} from '@/pages/dynamic-form-page/dynamic-form-page';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';

describe('DynamicForm', () => {
  let component: DynamicFormPage;
  let fixture: ComponentFixture<DynamicFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormPage],
      providers: [provideZonelessChangeDetection(), provideHttpClient()]
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
