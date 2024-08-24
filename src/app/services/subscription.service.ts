import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://127.0.0.1:8000/api/subscriptions';

  constructor(private http: HttpClient) { }

  getSubscriptions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSubscription(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createSubscription(subscription: any): Observable<any> {
    return this.http.post(this.apiUrl, subscription);
  }

  updateSubscription(id: number, subscription: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, subscription);
  }

  deleteSubscription(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
