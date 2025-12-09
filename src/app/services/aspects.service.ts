import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AspectsService {
  private apiUrl = 'http://localhost:5288/api/aspects';

  constructor(private http: HttpClient) {}

  getAllAspects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAspectsForSpirit(spiritId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-spirit/${spiritId}`);
  }
}
