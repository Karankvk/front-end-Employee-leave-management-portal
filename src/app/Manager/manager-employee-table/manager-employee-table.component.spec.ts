import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmployeeTableComponent } from './manager-employee-table.component';

describe('ManagerEmployeeTableComponent', () => {
  let component: ManagerEmployeeTableComponent;
  let fixture: ComponentFixture<ManagerEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerEmployeeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
