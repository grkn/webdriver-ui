import { TestBed } from '@angular/core/testing';

import { TestProjectResolverService } from './test-project-resolver.service';

describe('TestProjectResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestProjectResolverService = TestBed.get(TestProjectResolverService);
    expect(service).toBeTruthy();
  });
});
