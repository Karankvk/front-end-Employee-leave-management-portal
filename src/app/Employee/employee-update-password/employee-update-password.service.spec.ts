import { TestBed } from '@angular/core/testing';

import { EmployeeUpdatePasswordService } from './employee-update-password.service';

describe('EmployeeUpdatePasswordService', () => {
  let service: EmployeeUpdatePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeUpdatePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
