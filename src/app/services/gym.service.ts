import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {
  private apiUrl = 'http://127.0.0.1:8000/api/gyms';

  constructor(private http: HttpClient) { }

  getGyms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getGym(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createGym(gym: any): Observable<any> {
    return this.http.post(this.apiUrl, gym);
  }

  updateGym(id: number, gym: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, gym);
  }

  deleteGym(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
