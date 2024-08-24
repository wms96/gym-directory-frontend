import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://127.0.0.1:8000/api/branches';

  constructor(private http: HttpClient) { }

  getBranches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBranch(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post(this.apiUrl, branch);
  }

  updateBranch(id: number, branch: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
