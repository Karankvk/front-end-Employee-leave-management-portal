import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { EmployeeLoginRole } from 'src/app/model/EmployeeLoginRole';
import { Login } from 'src/app/model/Login';
import { UpdateEmployee } from 'src/app/model/UpdateEmployee';
import { environment } from 'src/environments/environment';
import { CreateEmployee } from 'src/app/model/CreateEmployee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  private apiUrl = environment.apiUrl;
  private employeeUrl: string;
  private employeeManagerUrl: string;
  private deletedEmployeeUrl: string;
  private employeeLoginRoleUrl: string;
  private postEmployeeRole: string;
  private postEmployeeDelete: string;
  private createEmployeeLogin: string;
  // For login form
  private postLoginUrl: string;

  constructor(private httpClient: HttpClient) {
    this.employeeUrl =  `${this.apiUrl}/v3/employee`;
    this.employeeManagerUrl =  `${this.apiUrl}/v3/employeeGetManager`;
    this.employeeLoginRoleUrl =  `${this.apiUrl}/v3/employee_login_role`;
    this.deletedEmployeeUrl =  `${this.apiUrl}/v3/employee_deleted_employees`;
    this.postEmployeeRole =  `${this.apiUrl}/v3/update_employee_role`;
    this.postEmployeeDelete = `${this.apiUrl}/v3/delete_employee`;
    this.createEmployeeLogin = `${this.apiUrl}/v1/create_login_employee`
    // For login form
    this.postLoginUrl = `${this.apiUrl}/v1/loginSaveData`;
  }

  public findAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeUrl);
  }

  public findAllManager(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeManagerUrl);
  }

  public findAllDeletedEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.deletedEmployeeUrl);
  }

  public employeeWithLoginRole(): Observable<EmployeeLoginRole[]> {
    return this.httpClient.get<EmployeeLoginRole[]>(this.employeeLoginRoleUrl);
  }

  public saveDetailsEmployee(employee: CreateEmployee): Observable<object> {
    return this.httpClient.post(`${this.createEmployeeLogin}`, employee);
  }

  public updateEmployee(employee: Employee): Observable<object> {
    return this.httpClient.put(`${this.employeeUrl}`, employee);
  }

  public updateEmployeeDetails(employee: UpdateEmployee): Observable<object> {
    return this.httpClient.put(`${this.postEmployeeRole}`, employee);
  }

  public deleteEmployee(loginId : number): Observable<any> {
    return this.httpClient.delete(`${this.postEmployeeDelete}/${loginId}`);
  }

  // For login form
  public saveLogin(login: Login): Observable<object> {
    return this.httpClient.post(`${this.postLoginUrl}`, login);
  }

}

