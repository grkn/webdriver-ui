import { TestBed } from '@angular/core/testing';

import { TestSuiteFetchResolver } from './test-suite-fetch-resolver.service';

describe('TestSuiteFetchResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestSuiteFetchResolver = TestBed.get(TestSuiteFetchResolver);
    expect(service).toBeTruthy();
  });
});
