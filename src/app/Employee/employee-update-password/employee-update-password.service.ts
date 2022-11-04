import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/Employee';
import { UpdatePassword } from 'src/app/model/UpdatePassword';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeUpdatePasswordService {

  private apiUrl = environment.apiUrl;
  private getLoginDetailsUrl: string;
  private updatePasswordUrl: string;

  constructor(private httpClient: HttpClient) {
    this.updatePasswordUrl = `${this.apiUrl}/v1/loginPassword`;
    this.getLoginDetailsUrl = `${this.apiUrl}/v1/employee_details`;
  }

  public getSpecificEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.getLoginDetailsUrl);
  }

  public updateEmployeePassword(updatePassword: UpdatePassword): Observable<object> {
    return this.httpClient.put(`${this.updatePasswordUrl}`, updatePassword);
  }
}
