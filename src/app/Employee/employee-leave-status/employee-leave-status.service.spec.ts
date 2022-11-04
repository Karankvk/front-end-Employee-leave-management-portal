import { TestBed } from '@angular/core/testing';

import { EmployeeLeaveStatusService } from './employee-leave-status.service';

describe('EmployeeLeaveStatusService', () => {
  let service: EmployeeLeaveStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLeaveStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
