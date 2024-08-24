import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://127.0.0.1:8000/api/addresses';

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAddress(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAddress(address: any): Observable<any> {
    return this.http.post(this.apiUrl, address);
  }

  updateAddress(id: number, address: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
