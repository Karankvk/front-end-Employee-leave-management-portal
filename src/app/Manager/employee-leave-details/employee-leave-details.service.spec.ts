import { TestBed } from '@angular/core/testing';

import { EmployeeLeaveDetailsService } from './employee-leave-details.service';

describe('EmployeeLeaveDetailsService', () => {
  let service: EmployeeLeaveDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLeaveDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
