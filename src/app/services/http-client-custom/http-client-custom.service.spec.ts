import { TestBed } from '@angular/core/testing';

import { HttpClientCustomService } from './http-client-custom.service';

describe('HttpClientCustomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpClientCustomService = TestBed.get(HttpClientCustomService);
    expect(service).toBeTruthy();
  });
});
