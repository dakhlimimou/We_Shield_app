import { TestBed } from '@angular/core/testing';

import { HomeScrollsService } from './home-scrolls.service';

describe('HomeScrollsService', () => {
  let service: HomeScrollsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeScrollsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
