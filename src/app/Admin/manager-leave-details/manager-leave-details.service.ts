import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeLeaveDTO } from 'src/app/model/EmployeeLeaveDTO';
import { Leave } from '../../model/Leave';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerLeaveDetailsService {

  private apiUrl = environment.apiUrl;
  private leaveAllUrl: string;
  private leaveStatusUrl: string;
  private leaveRejectUrl: string;
  private leverRevokeUrl: string;
  private employeeLeaves: string;

  constructor(private httpClient: HttpClient) {
    this.leaveAllUrl = `${this.apiUrl}/v4/managerLeaves`;
    this.leaveStatusUrl = `${this.apiUrl}/v4/updateStatus`;
    this.leaveRejectUrl = `${this.apiUrl}/v4/update_status_rejected`;
    this.leverRevokeUrl = `${this.apiUrl}/v4/manager_revoked_leave`;
    this.employeeLeaves = `${this.apiUrl}/v4/employeeLeaves`;
  }

  public findAllLeave():Observable<EmployeeLeaveDTO[]> {
    return this.httpClient.get<EmployeeLeaveDTO[]>(this.leaveAllUrl);
  }

  public updateLeaveStatus(leave: Leave): Observable<object>{
    console.log(leave)
    return this.httpClient.put(`${this.leaveStatusUrl}`, leave);
  }

  public rejectLeave( leave: Leave): Observable<any> {
    return this.httpClient.put(`${this.leaveRejectUrl}`, leave);
  }

  public revokeLeave(): Observable<EmployeeLeaveDTO[]> {
    return this.httpClient.get<EmployeeLeaveDTO[]>(this.leverRevokeUrl);
  }

  public findAllEmployeeLeaves(): Observable<EmployeeLeaveDTO[]> {
    return this.httpClient.get<EmployeeLeaveDTO[]>(this.employeeLeaves);
  }

}
