import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private apiUrl = 'http://localhost:5288/api/games';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    };
  }

  getUserGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/user`, this.authHeaders());
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`, this.authHeaders());
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game, this.authHeaders());
  }

  updateGame(id: number, game: Partial<Game>) {
    return this.http.put(`${this.apiUrl}/${id}`, game, this.authHeaders());
  }

  deleteGame(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.authHeaders());
  }
}
