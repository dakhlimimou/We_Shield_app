import { TestBed } from '@angular/core/testing';

import { CanActivateCreateBlogService } from './can-activate-create-blog.service';

describe('CanActivateCreateBlogService', () => {
  let service: CanActivateCreateBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateCreateBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
