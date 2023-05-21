import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backend_url } from '../../../configs/external';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  baseURL = `${backend_url}/file/fileupload`;

  constructor(private http: HttpClient) {}

  Upload(file: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}`, {
      file,
    });
  }
}
