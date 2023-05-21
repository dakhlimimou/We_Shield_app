import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAndProfileComponent } from './test-and-profile.component';

describe('TestAndProfileComponent', () => {
  let component: TestAndProfileComponent;
  let fixture: ComponentFixture<TestAndProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAndProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAndProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
