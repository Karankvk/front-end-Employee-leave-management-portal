import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../model/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;
  private roleUrl: string;
  constructor(private httpClient: HttpClient) {
    this.roleUrl = `${this.apiUrl}/v2/role`;
  }

  public findAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.roleUrl);
  }
}
