import { TestBed } from '@angular/core/testing';

import { CanActivateVisitorService } from './can-activate-visitor.service';

describe('CanActivateVisitorService', () => {
  let service: CanActivateVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
