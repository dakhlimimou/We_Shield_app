import { TestBed } from '@angular/core/testing';

import { CanActivateAdminOrExpertService } from './can-activate-admin-or-expert.service';

describe('CanActivateAdminOrExpertService', () => {
  let service: CanActivateAdminOrExpertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateAdminOrExpertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
