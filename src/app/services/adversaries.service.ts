import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Adversary {
  id: number;
  name: string;
  imageUrl: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AdversariesService {
  private apiUrl = 'http://localhost:5288/api/Adversaries';

  constructor(private http: HttpClient) {}

  getAdversaries(): Observable<Adversary[]> {
    return this.http.get<Adversary[]>(this.apiUrl);
  }

  getAdversary(id: number): Observable<Adversary> {
    return this.http.get<Adversary>(`${this.apiUrl}/${id}`);
  }
}
