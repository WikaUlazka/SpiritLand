import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Spirit {
  id: number;
  name: string;
  complexity: string;
  description: string;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class SpiritService {
  private apiUrl = 'http://localhost:5288/api/spirits';

  constructor(private http: HttpClient) {}

  getSpirits(): Observable<Spirit[]> {
    return this.http.get<Spirit[]>(this.apiUrl);
  }
}
