import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { Leave } from '../../model/Leave';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplyLeaveService {

  private apiUrl = environment.apiUrl;
  private saveLeaveUrl: string;
  private employeeDetailUrl: string;

  constructor(private httpClient: HttpClient) {
    this.saveLeaveUrl = `${this.apiUrl}/v4/addLeave`;
    this.employeeDetailUrl = `${this.apiUrl}/v1/employee_details`;
  }

  public saveLeave(leave: Leave): Observable<object> {
    return this.httpClient.post(`${this.saveLeaveUrl}`, leave);
  }

  public getEmployeeDetail(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeDetailUrl);
  }
}
