import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService, UserDto } from '../services/users.service';
import { GameInvitesService } from '../services/game-invites.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game-invite-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-invite-players.html',
  styleUrls: ['./game-invite-players.scss']
})
export class GameInvitePlayersComponent implements OnInit {

  gameId: number | null = null;
  currentUserId: number | null = null;

  users: UserDto[] = [];
  selectedUserIds: number[] = [];

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private invitesService: GameInvitesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.auth.getCurrentUserId();

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      alert('Brak identyfikatora gry.');
      this.router.navigate(['/games']);
      return;
    }

    this.gameId = Number(id);

    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;

    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter(
          user => user.id !== this.currentUserId
        );

        this.loading = false;
      },

      error: (err) => {
        console.error('Błąd pobierania użytkowników:', err);
        this.loading = false;
      }
    });
  }

  isSelected(userId: number): boolean {
    return this.selectedUserIds.includes(userId);
  }

  toggleUser(userId: number): void {
    if (this.isSelected(userId)) {
      this.selectedUserIds = this.selectedUserIds.filter(
        id => id !== userId
      );
    } else {
      this.selectedUserIds.push(userId);
    }
  }

  invitePlayers(): void {
    if (!this.gameId) {
      alert('Brak identyfikatora gry.');
      return;
    }

    if (!this.currentUserId) {
      alert('Nie jesteś zalogowany.');
      return;
    }

    if (this.selectedUserIds.length === 0) {
      alert('Wybierz przynajmniej jednego gracza.');
      return;
    }

    this.loading = true;

    let completed = 0;
    let errors = 0;

    for (const userId of this.selectedUserIds) {

      this.invitesService.sendInvite({
        senderUserId: this.currentUserId,
        receiverUserId: userId,
        gameId: this.gameId
      }).subscribe({
        next: () => {
          completed++;

          if (completed + errors === this.selectedUserIds.length) {
            this.finishInviting(errors);
          }
        },

        error: (err) => {
          console.error(
            `Błąd zapraszania użytkownika ${userId}:`,
            err
          );

          errors++;

          if (completed + errors === this.selectedUserIds.length) {
            this.finishInviting(errors);
          }
        }
      });
    }
  }

  finishInviting(errors: number): void {
    this.loading = false;

    if (errors > 0) {
      alert(
        `Zaproszenia wysłane, ale wystąpiło ${errors} błędów.`
      );
    } else {
      alert('Zaproszenia zostały wysłane.');
    }

    this.selectedUserIds = [];

    this.router.navigate(['/games/edit', this.gameId]);
  }

  skipInviting(): void {
    if (!this.gameId) {
      this.router.navigate(['/games']);
      return;
    }

    this.router.navigate(['/games/edit', this.gameId]);
  }
}