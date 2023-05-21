import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnonymousComponent } from './register-anonymous.component';

describe('RegisterAnonymousComponent', () => {
  let component: RegisterAnonymousComponent;
  let fixture: ComponentFixture<RegisterAnonymousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAnonymousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
