import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedDataViewer } from './submitted-data-viewer';
import {provideZonelessChangeDetection} from '@angular/core';

describe('SubmittedDataViewer', () => {
  let component: SubmittedDataViewer;
  let fixture: ComponentFixture<SubmittedDataViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedDataViewer],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedDataViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
