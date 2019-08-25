import { TestBed } from '@angular/core/testing';

import { ManipulateDriverFetchResolverService } from './manipulate-driver-fetch-resolver.service';

describe('ManipulateDriverFetchResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManipulateDriverFetchResolverService = TestBed.get(ManipulateDriverFetchResolverService);
    expect(service).toBeTruthy();
  });
});
