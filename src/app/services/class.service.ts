import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://127.0.0.1:8000/api/classes';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getClass(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createClass(classObj: any): Observable<any> {
    return this.http.post(this.apiUrl, classObj);
  }

  updateClass(id: number, classObj: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, classObj);
  }

  deleteClass(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
