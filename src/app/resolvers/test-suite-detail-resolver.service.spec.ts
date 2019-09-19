import { TestBed } from '@angular/core/testing';

import { TestSuiteDetailResolverService } from './test-suite-detail-resolver.service';

describe('TestSuiteDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestSuiteDetailResolverService = TestBed.get(TestSuiteDetailResolverService);
    expect(service).toBeTruthy();
  });
});
