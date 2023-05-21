import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPatternComponent } from './otp-pattern.component';

describe('OtpPatternComponent', () => {
  let component: OtpPatternComponent;
  let fixture: ComponentFixture<OtpPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
