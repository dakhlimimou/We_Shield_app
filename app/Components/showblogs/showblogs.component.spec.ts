import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowblogsComponent } from './showblogs.component';

describe('ShowblogsComponent', () => {
  let component: ShowblogsComponent;
  let fixture: ComponentFixture<ShowblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowblogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
