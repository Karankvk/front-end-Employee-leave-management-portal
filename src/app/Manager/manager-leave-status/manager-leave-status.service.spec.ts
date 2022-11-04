import { TestBed } from '@angular/core/testing';

import { ManagerLeaveStatusService } from './manager-leave-status.service';

describe('ManagerLeaveStatusService', () => {
  let service: ManagerLeaveStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerLeaveStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
