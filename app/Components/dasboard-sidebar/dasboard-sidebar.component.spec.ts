import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardSidebarComponent } from './dasboard-sidebar.component';

describe('DasboardSidebarComponent', () => {
  let component: DasboardSidebarComponent;
  let fixture: ComponentFixture<DasboardSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
