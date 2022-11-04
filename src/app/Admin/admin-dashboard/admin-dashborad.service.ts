import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = environment.apiUrl;
  private employeeCount: string;
  private managerCount: string;
  private managerLeaveCount: string;
  private employeeLeaveCount: string;
  private managerEmployeePercentage: string;

  constructor(private httpClient: HttpClient) {
    this.employeeCount = `${this.apiUrl}/v1/employeeCount`;
    this.managerCount = `${this.apiUrl}/v1/managerCount`;
    this.managerLeaveCount = `${this.apiUrl}/v4/countManagerLeave`;
    this.employeeLeaveCount = `${this.apiUrl}/v4/countEmployeeLeave`;
    this.managerEmployeePercentage = `${this.apiUrl}/v4/array_employee_manager`;
  }

  public countEmployee(): Observable<number> {
    return this.httpClient.get<number>(this.employeeCount);
  }

  public countManager(): Observable<number> {
    return this.httpClient.get<number>(this.managerCount);
  }

  public countManagerLeave(): Observable<number> {
    return this.httpClient.get<number>(this.managerLeaveCount);
  }

  public countEmployeeLeave(): Observable<number> {
    return this.httpClient.get<number>(this.employeeLeaveCount);
  }

  public attendencePercentage(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.managerEmployeePercentage);
  }

}
