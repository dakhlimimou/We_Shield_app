import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOneBlogComponent } from './show-one-blog.component';

describe('ShowOneBlogComponent', () => {
  let component: ShowOneBlogComponent;
  let fixture: ComponentFixture<ShowOneBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOneBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
