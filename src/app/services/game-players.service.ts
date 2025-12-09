import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GamePlayer {
  id: number;
  gameId: number;
  userId: number;
  spiritId: number | null;
  aspectId: number | null;
  notes: string | null;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class GamePlayersService {
  private apiUrl = 'http://localhost:5288/api/GamePlayers';

  constructor(private http: HttpClient) {}

  getPlayersForGame(gameId: number): Observable<GamePlayer[]> {
    return this.http.get<GamePlayer[]>(`${this.apiUrl}/game/${gameId}`);
  }

  updatePlayer(id: number, payload: Partial<GamePlayer>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  addPlayer(payload: Partial<GamePlayer>): Observable<GamePlayer> {
    return this.http.post<GamePlayer>(`${this.apiUrl}`, payload);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
