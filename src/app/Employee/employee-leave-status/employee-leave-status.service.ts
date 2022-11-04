import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../../model/Leave';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/model/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveStatusService {
  private apiUrl = environment.apiUrl;
  private employeeSpecificUrl: string;
  private revokeLeaveUrl: string;
  private updateLeaveUrl: string;
  private employeeDetailUrl: string;


  constructor(private httpClient: HttpClient) {
    this.employeeSpecificUrl = `${this.apiUrl}/v1/employee_specific_leave`;
    this.revokeLeaveUrl = `${this.apiUrl}/v4/revokeLeave`;
    this.updateLeaveUrl = `${this.apiUrl}/v4/updateLeave`;
    this.employeeDetailUrl = `${this.apiUrl}/v1/employee_details`;

  }

  public employeeSpecificLeave(): Observable<Leave[]> {
    return this.httpClient.get<Leave[]>(this.employeeSpecificUrl);
  }

  public revokeLeave(leave: Leave): Observable<object> {
    return this.httpClient.put(`${this.revokeLeaveUrl}`, leave);
  }

  public updateLeave(leave: Leave): Observable<object> {
    return this.httpClient.put(`${this.updateLeaveUrl}`, leave);
  }

  public getEmployeeDetail(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeDetailUrl);
  }

}
