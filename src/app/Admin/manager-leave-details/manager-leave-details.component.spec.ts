import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeaveDetailsComponent } from './manager-leave-details.component';

describe('ManagerLeaveDetailsComponent', () => {
  let component: ManagerLeaveDetailsComponent;
  let fixture: ComponentFixture<ManagerLeaveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerLeaveDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLeaveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
