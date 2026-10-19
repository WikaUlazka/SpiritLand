import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameInvite {
  id: number;
  senderUserId: number;
  receiverUserId: number;
  gameId: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;

  game?: {
    id: number;
    datePlayed: string;
    result: string;
  };

  senderUser?: {
  id: number;
  username: string;
} | null;
}

@Injectable({
  providedIn: 'root'
})
export class GameInvitesService {

  private apiUrl = 'http://localhost:5288/api/GameInvites';

  constructor(private http: HttpClient) {}

  getUserInvites(userId: number): Observable<GameInvite[]> {
    return this.http.get<GameInvite[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }
  sendInvite(invite: {
    senderUserId: number;
    receiverUserId: number;
    gameId: number;
  }): Observable<GameInvite> {
    return this.http.post<GameInvite>(
      `${this.apiUrl}/send`,
      invite
    );
  }

  acceptInvite(inviteId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/accept/${inviteId}`,
      {}
    );
  }

  rejectInvite(inviteId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reject/${inviteId}`,
      {}
    );
  }
}