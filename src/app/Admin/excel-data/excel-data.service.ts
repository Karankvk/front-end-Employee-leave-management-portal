import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeInformationCSV } from 'src/app/model/EmployeeInformationCSV';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExcelDataService {
  private apiUrl = environment.apiUrl;
  private orderByIdurl: string;
  private orderByGenderUrl: string;
  private orderByNameUrl: string;
  private saveExcelUrl: string;
  private createEmployeeUrl: string;
  private editEmployeeUrl: string;
  private deleteEmployeeUrl: string;

  constructor(private httpClient: HttpClient) {
    this.orderByIdurl = `${this.apiUrl}/v7/get_db_data`;
    this.orderByGenderUrl = `${this.apiUrl}/v7/order_by_employee_gender`;
    this.orderByNameUrl = `${this.apiUrl}/v7/order_by_employee_name`;
    this.saveExcelUrl = `${this.apiUrl}/v7/upload_csv_to_db`;
    this.createEmployeeUrl = `${this.apiUrl}/v7/save_employee`;
    this.editEmployeeUrl = `${this.apiUrl}/v7/update_employee`;
    this.deleteEmployeeUrl = `${this.apiUrl}/v7/delete_employee`;
  }

  // Read
  public orderById(): Observable<EmployeeInformationCSV[]> {
    return this.httpClient.get<EmployeeInformationCSV[]>(this.orderByIdurl);
  }

  public orderByGender(): Observable<EmployeeInformationCSV[]> {
    return this.httpClient.get<EmployeeInformationCSV[]>(this.orderByGenderUrl);
  }

  public orderByName(): Observable<EmployeeInformationCSV[]> {
    return this.httpClient.get<EmployeeInformationCSV[]>(this.orderByNameUrl);
  }

  // Create
  public saveExcel(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest('POST', `${this.saveExcelUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(request);
  }

  public createEmployee(
    employeeInformationCSV: EmployeeInformationCSV
  ): Observable<object> {
    return this.httpClient.post(
      `${this.createEmployeeUrl}`,
      employeeInformationCSV
    );
  }

  // Update
  public updateEmployee(
    employeeInformationCSV: EmployeeInformationCSV
  ): Observable<object> {
    return this.httpClient.put(`${this.editEmployeeUrl}`, employeeInformationCSV);
  }

  // Delete
  public deleteEmployee(
    employeeInformationCSV: EmployeeInformationCSV
  ): Observable<object> {
    return this.httpClient.put(
      `${this.deleteEmployeeUrl}`,
      employeeInformationCSV
    );
  }
}
