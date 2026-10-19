
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { GameInvitesService } from '../services/game-invites.service';
import type { GameInvite } from '../services/game-invites.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game-invites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-invites.html',
  styleUrls: ['./game-invites.scss'],
})
export class GameInvitesComponent implements OnInit {
  invites: GameInvite[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private invitesService: GameInvitesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInvites();
  }

  loadInvites(): void {
    const userId = this.auth.getCurrentUserId();

    if (!userId) {
      this.error = 'Zaloguj się, aby zobaczyć swoje zaproszenia.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.invitesService.getUserInvites(userId).subscribe({
      next: (invites: GameInvite[]) => {
        this.invites = (invites ?? []).filter(
          (invite) => invite.status?.toLowerCase() === 'pending'
        );

        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania zaproszeń:', err);
        this.error = 'Nie udało się pobrać zaproszeń. Spróbuj ponownie.';
        this.loading = false;
      },
    });
  }

  acceptInvite(invite: GameInvite): void {
    this.invitesService.acceptInvite(invite.id).subscribe({
      next: () => {
        this.invites = this.invites.filter(
          (item) => item.id !== invite.id
        );
      },
      error: (err) => {
        console.error('Błąd akceptowania zaproszenia:', err);
        this.error = 'Nie udało się zaakceptować zaproszenia.';
      },
    });
  }

  rejectInvite(invite: GameInvite): void {
    this.invitesService.rejectInvite(invite.id).subscribe({
      next: () => {
        this.invites = this.invites.filter(
          (item) => item.id !== invite.id
        );
      },
      error: (err) => {
        console.error('Błąd odrzucania zaproszenia:', err);
        this.error = 'Nie udało się odrzucić zaproszenia.';
      },
    });
  }
}
