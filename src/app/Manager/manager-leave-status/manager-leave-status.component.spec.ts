import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeaveStatusComponent } from './manager-leave-status.component';

describe('ManagerLeaveStatusComponent', () => {
  let component: ManagerLeaveStatusComponent;
  let fixture: ComponentFixture<ManagerLeaveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerLeaveStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLeaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
