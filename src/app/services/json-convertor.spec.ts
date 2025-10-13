import { TestBed } from '@angular/core/testing';

import { JsonConvertor } from './json-convertor';

describe('JsonConvertor', () => {
  let service: JsonConvertor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonConvertor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
