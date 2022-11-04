import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../../model/Employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SideNavBarService {

  public sideNavState$: Subject<boolean> = new Subject();

  private apiUrl = environment.apiUrl;
  private employeeDetailUrl: string;
  private employeeRoleIdUrl: string;


  constructor(private httpClient: HttpClient) {
    this.employeeRoleIdUrl = `${this.apiUrl}/v1/employee_role_id`;
    this.employeeDetailUrl = `${this.apiUrl}/v1/employee_details`;
  }

  public getEmployeeRoleId(): Observable<number> {
    return this.httpClient.get<number>(this.employeeRoleIdUrl);
  }

  public getEmployeeDetail(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeDetailUrl);
  }

}
