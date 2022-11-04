import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../model/Login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private emailUrl: string;
  private updatePassword: string;

  constructor(private httpClient: HttpClient) {
    this.emailUrl = `${this.apiUrl}/v1/matchCredential`;
    this.updatePassword = `${this.apiUrl}/v1/forgetPassword`;
  }

  public loginUser(login: Login): Observable<Login> {
    return this.httpClient.post<Login>(`${this.emailUrl}`, login);
  }

  public forgetPassword(login: Login): Observable<object> {
    return this.httpClient.put(`${this.updatePassword}`, login);
  }

}
