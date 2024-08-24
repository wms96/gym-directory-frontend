import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/admins';

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAdmin(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post(this.apiUrl, admin);
  }

  updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, admin);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
