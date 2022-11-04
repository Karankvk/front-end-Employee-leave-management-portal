import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/Employee';
import { Leave } from 'src/app/model/Leave';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerLeaveStatusService {
  apiUrl = environment.apiUrl;
  private revokeLeaveUrl: string;
  private employeeDetailUrl: string;


  constructor(private httpClient: HttpClient) {
    this.revokeLeaveUrl = `${this.apiUrl}/v4/revokeLeave`;
    this.employeeDetailUrl = `${this.apiUrl}/v1/employee_details`;
  }

  public revokeLeave(leave: Leave): Observable<object> {
    return this.httpClient.put(`${this.revokeLeaveUrl}`, leave);
  }

  public getEmployeeDetail(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeDetailUrl);
  }
}
