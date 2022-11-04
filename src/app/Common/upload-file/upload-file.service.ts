import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileModel } from 'src/app/model/FileModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private apiUrl = environment.apiUrl;
  private postUrl: string;
  private getUrl: string;
  private softDeleteUrl: string;
  private permanentDeleteUrl: string;

  constructor(private httpClient: HttpClient) {
    this.postUrl = `${this.apiUrl}/v5/upload`;
    this.getUrl = `${this.apiUrl}/v5/files`;
    this.softDeleteUrl = `${this.apiUrl}/v5/soft_delete_file`;
    this.permanentDeleteUrl = `${this.apiUrl}/v5/permanent_delete_file`;
  }

  // Create
  public saveFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest('POST', `${this.postUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(request);
  }

  // Read
  public getFiles(): Observable<any> {
    return this.httpClient.get(`${this.getUrl}`);
  }

  //Delete
  public softDelete(fileModel: FileModel): Observable<FileModel> {
    return this.httpClient.post<FileModel>(`${this.softDeleteUrl}`, fileModel);
  }

  public permanentDelete(fileModel: FileModel): Observable<FileModel> {
    return this.httpClient.post<FileModel>(
      `${this.permanentDeleteUrl}`,
      fileModel
    );
  }
}
