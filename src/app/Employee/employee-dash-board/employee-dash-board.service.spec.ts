import { TestBed } from '@angular/core/testing';

import { EmployeeDashBoardService } from './employee-dash-board.service';

describe('EmployeeDashBoardService', () => {
  let service: EmployeeDashBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDashBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
