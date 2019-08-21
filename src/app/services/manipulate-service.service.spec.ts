import { TestBed } from '@angular/core/testing';

import { ManipulateServiceService } from './manipulate-service.service';

describe('ManipulateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManipulateServiceService = TestBed.get(ManipulateServiceService);
    expect(service).toBeTruthy();
  });
});
