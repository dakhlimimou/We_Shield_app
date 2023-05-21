import { TestBed } from '@angular/core/testing';

import { CanActivateAdminService } from './can-activate-admin.service';

describe('CanActivateAdminService', () => {
  let service: CanActivateAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
