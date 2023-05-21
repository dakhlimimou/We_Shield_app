import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderMaintenaceComponent } from './under-maintenace.component';

describe('UnderMaintenaceComponent', () => {
  let component: UnderMaintenaceComponent;
  let fixture: ComponentFixture<UnderMaintenaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderMaintenaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderMaintenaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
