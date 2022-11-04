import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdatePasswordComponent } from './employee-update-password.component';

describe('EmployeeUpdatePasswordComponent', () => {
  let component: EmployeeUpdatePasswordComponent;
  let fixture: ComponentFixture<EmployeeUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUpdatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
