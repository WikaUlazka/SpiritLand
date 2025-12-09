import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Spirit {
  id: number;
  name: string;
  imageUrl: string | null;
  description?: string;
  complexity?: string;
}

export interface Aspect {
  id: number;
  name: string;
  imageUrl: string | null;
  spiritId: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpiritsService {
  private spiritsUrl = 'http://localhost:5288/api/spirits';
  private aspectsBySpiritUrl = 'http://localhost:5288/api/aspects/by-spirit';

  constructor(private http: HttpClient) {}

  getSpirits(): Observable<Spirit[]> {
    return this.http.get<Spirit[]>(this.spiritsUrl);
  }

  getSpirit(id: number): Observable<Spirit> {
    return this.http.get<Spirit>(`${this.spiritsUrl}/${id}`);
  }

  getAspectsForSpirit(spiritId: number): Observable<Aspect[]> {
    return this.http.get<Aspect[]>(`${this.aspectsBySpiritUrl}/${spiritId}`);
  }
}
