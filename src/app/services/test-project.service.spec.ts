import { TestBed } from '@angular/core/testing';

import { TestProjectService } from './test-project.service';

describe('TestProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestProjectService = TestBed.get(TestProjectService);
    expect(service).toBeTruthy();
  });
});
