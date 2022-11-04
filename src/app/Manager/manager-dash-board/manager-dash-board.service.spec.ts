import { TestBed } from '@angular/core/testing';

import { ManagerDashBoardService } from './manager-dash-board.service';

describe('ManagerDashBoardService', () => {
  let service: ManagerDashBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerDashBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
