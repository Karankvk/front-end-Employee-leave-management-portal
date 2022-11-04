import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDashBoardService {

  private apiUrl = environment.apiUrl;
  private employeeDetailUrl: string;
  private employeePercentage: string;

  constructor(private httpClient: HttpClient) {
    this.employeeDetailUrl = `${this.apiUrl}/v1/employee_details`;
    this.employeePercentage = `${this.apiUrl}/v1/employee_percentage`;
  }

  public getEmployeeDetail(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeDetailUrl);
  }

  public getEmployeePercentage(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.employeePercentage);
  }

}
