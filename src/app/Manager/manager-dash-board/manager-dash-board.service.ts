import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../../model/Leave';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/model/Employee';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashBoardService {

  private apiUrl = environment.apiUrl;
  private employeeDetailUrl: string;
  private employeeManagerCountUrl: string;

  constructor(private httpClient: HttpClient) {
    this.employeeDetailUrl = `${this.apiUrl}/v1/employee_details`;
    this.employeeManagerCountUrl = `${this.apiUrl}/v4/array_employee_manager`;
  }

  public getEmployeeDetail(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeDetailUrl);
  }

  public employeeManagerCouunt(): Observable<Leave[]> {
    return this.httpClient.get<Leave[]>(this.employeeManagerCountUrl);
  }

}
