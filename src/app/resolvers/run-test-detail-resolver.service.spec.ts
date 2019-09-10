import { TestBed } from '@angular/core/testing';

import { RunTestDetailResolverService } from './run-test-detail-resolver.service';

describe('RunTestDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunTestDetailResolverService = TestBed.get(RunTestDetailResolverService);
    expect(service).toBeTruthy();
  });
});
