import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormConfigUploader } from './dynamic-form-config-uploader';

describe('DynamicFormConfigUploader', () => {
  let component: DynamicFormConfigUploader;
  let fixture: ComponentFixture<DynamicFormConfigUploader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormConfigUploader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormConfigUploader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
