import { TestBed } from '@angular/core/testing';

import { TestSuiteRunHistoryDetailResolverService } from './test-suite-run-history-detail-resolver.service';

describe('TestSuiteRunHistoryDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestSuiteRunHistoryDetailResolverService = TestBed.get(TestSuiteRunHistoryDetailResolverService);
    expect(service).toBeTruthy();
  });
});
