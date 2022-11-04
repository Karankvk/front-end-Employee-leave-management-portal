import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeLeaveDTO } from 'src/app/model/EmployeeLeaveDTO';
import { Leave } from '../../model/Leave';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveDetailsService {

  private apiUrl = environment.apiUrl;
  private employeeLeaveAllUrl: string;
  private managerLeaveAllUrl: string;
  private leaveStatusUrl: string;
  private leaveRejectUrl: string;
  private leaveRevokeUrl: string;

  constructor(private httpClient: HttpClient) {
    this.employeeLeaveAllUrl = `${this.apiUrl}/v4/employeeLeaves`;
    this.managerLeaveAllUrl =`${this.apiUrl}/v4/managerLeaves`;
    this.leaveStatusUrl = `${this.apiUrl}/v4/updateStatus`;
    this.leaveRejectUrl = `${this.apiUrl}/v4/update_status_rejected`;
    this.leaveRevokeUrl = `${this.apiUrl}/v4/employee_revoked_leave`;
  }

  public findAllLeave():Observable<EmployeeLeaveDTO[]> {
    return this.httpClient.get<EmployeeLeaveDTO[]>(this.employeeLeaveAllUrl);
  }

  public managerAllLeave(): Observable<EmployeeLeaveDTO[]> {
    return this.httpClient.get<EmployeeLeaveDTO[]>(this.managerLeaveAllUrl);
  }

  public updateLeaveStatus(leave: Leave): Observable<object>{
    return this.httpClient.put(`${this.leaveStatusUrl}`, leave);
  }

  public rejectLeave(leave: Leave): Observable<object> {
    return this.httpClient.put(`${this.leaveRejectUrl}`, leave);
  }

  public revokeLeaves(): Observable<EmployeeLeaveDTO[]> {
    return this.httpClient.get<EmployeeLeaveDTO[]>(this.leaveRevokeUrl);
  }

}
