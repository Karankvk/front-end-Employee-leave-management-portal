import { TestBed } from '@angular/core/testing';

import { ManagerLeaveDetailsService } from './manager-leave-details.service';

describe('ManagerLeaveDetailsService', () => {
  let service: ManagerLeaveDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerLeaveDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
