import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesService } from '../../services/games.service';
import { GamePlayersService } from '../../services/game-players.service';
import { SpiritsService } from '../../services/spirits.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  templateUrl: './game-details.html',
  styleUrls: ['./game-details.scss'],
  imports: [CommonModule, FormsModule],
})
export class GameDetails implements OnInit {
  gameId!: number;
  game: any = null;

  players: any[] = [];
  spirits: any[] = [];

  loading = true;
  error = '';
  userId!: number;
  isHost = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private playersService: GamePlayersService,
    private spiritsService: SpiritsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = this.auth.getCurrentUserId()!;

    if (!Number.isInteger(this.gameId) || this.gameId <= 0) {
      this.error = 'Nieprawidłowy identyfikator gry.';
      this.loading = false;
      return;
    }

    this.loadData();
  }

  goBack(): void {
    this.router.navigate(['/games']);
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    this.spiritsService.getSpirits().subscribe({
      next: (spirits) => {
        this.spirits = spirits ?? [];

        this.gamesService.getGame(this.gameId).subscribe({
          next: (game) => {
            this.game = game;
            this.isHost = game.creatorUserId === this.userId;

            this.playersService.getPlayersForGame(this.gameId).subscribe({
              next: (players) => {
                this.players = players ?? [];

                this.players.forEach((player) => {
                  player.availableAspects = [];

                  if (player.spiritId) {
                    this.loadAspectsForPlayer(player);
                  }
                });

                this.loading = false;
              },
              error: (err) => {
                console.error('Błąd pobierania graczy:', err);
                this.error = 'Nie udało się pobrać listy graczy.';
                this.loading = false;
              },
            });
          },
          error: (err) => {
            console.error('Błąd pobierania gry:', err);
            this.error = 'Nie udało się załadować szczegółów rozgrywki.';
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Błąd pobierania duchów:', err);
        this.error = 'Nie udało się pobrać listy duchów.';
        this.loading = false;
      },
    });
  }

  private loadAspectsForPlayer(player: any): void {
    if (!player.spiritId) {
      player.availableAspects = [];
      player.aspectId = null;
      return;
    }

    this.spiritsService.getAspectsForSpirit(player.spiritId).subscribe({
      next: (aspects) => {
        player.availableAspects = aspects ?? [];

        if (
          !player.availableAspects.some(
            (aspect: any) => aspect.id === player.aspectId
          )
        ) {
          player.aspectId = null;
        }
      },
      error: (err) => {
        console.error('Błąd pobierania aspektów:', err);
        player.availableAspects = [];
      },
    });
  }

  onSpiritChange(player: any): void {
    player.aspectId = null;
    player.availableAspects = [];

    if (!player.spiritId) {
      return;
    }

    this.loadAspectsForPlayer(player);
  }

  savePlayer(player: any): void {
    this.playersService
      .updatePlayer(player.id, {
        spiritId: player.spiritId || null,
        aspectId: player.aspectId || null,
        notes: player.notes || null,
      })
      .subscribe({
        next: () => {
          alert('Zapisano zmiany!');
        },
        error: (err) => {
          console.error('Błąd zapisywania gracza:', err);
          alert('Nie udało się zapisać zmian. Spróbuj ponownie.');
        },
      });
  }
}