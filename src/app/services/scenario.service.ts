import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Scenario {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private apiUrl = 'http://localhost:5288/api/scenarios';

  constructor(private http: HttpClient) {}

  getScenarios(): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(this.apiUrl);
  }

  getScenario(id: number): Observable<Scenario> {
    return this.http.get<Scenario>(`${this.apiUrl}/${id}`);
  }
}
