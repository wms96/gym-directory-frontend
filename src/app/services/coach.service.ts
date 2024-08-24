import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = 'http://127.0.0.1:8000/api/coaches';

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCoach(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCoach(coach: any): Observable<any> {
    return this.http.post(this.apiUrl, coach);
  }
  createCoaches(coach: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, coach);
  }

  updateCoach(id: number, coach: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, coach);
  }

  deleteCoach(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
