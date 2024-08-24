import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private apiUrl = 'http://127.0.0.1:8000/api/owners';

  constructor(private http: HttpClient) { }

  getOwners(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOwner(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createOwner(owner: any): Observable<any> {
    return this.http.post(this.apiUrl, owner);
  }

  updateOwner(id: number, owner: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, owner);
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
