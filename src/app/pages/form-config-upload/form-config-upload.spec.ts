import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfigUpload } from './form-config-upload';

describe('FormConfigUpload', () => {
  let component: FormConfigUpload;
  let fixture: ComponentFixture<FormConfigUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConfigUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConfigUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
