import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExpertComponent } from './register-expert.component';

describe('RegisterExpertComponent', () => {
  let component: RegisterExpertComponent;
  let fixture: ComponentFixture<RegisterExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterExpertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
