import { TestBed } from '@angular/core/testing';

import { TestCaseTypeResolverService } from './test-case-type-resolver.service';

describe('TestCaseTypeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestCaseTypeResolverService = TestBed.get(TestCaseTypeResolverService);
    expect(service).toBeTruthy();
  });
});
