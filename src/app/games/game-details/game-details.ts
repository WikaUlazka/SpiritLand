import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  userId!: number;
  isHost = false;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private playersService: GamePlayersService,
    private spiritsService: SpiritsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = this.auth.getCurrentUserId()!;
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.spiritsService.getSpirits().subscribe((spirits) => {
      this.spirits = spirits;

      this.gamesService.getGame(this.gameId).subscribe((game) => {
        this.game = game;
        this.isHost = game.creatorUserId === this.userId;

        this.playersService.getPlayersForGame(this.gameId).subscribe((players) => {
          this.players = players;

          this.players.forEach((p) => {
            if (p.spiritId) {
              this.spiritsService.getAspectsForSpirit(p.spiritId).subscribe((aspects) => {
                p.availableAspects = aspects;

                if (!aspects.some((a) => a.id === p.aspectId)) {
                  p.aspectId = null;
                }
              });
            } else {
              p.availableAspects = [];
            }
          });

          this.loading = false;
        });
      });
    });
  }

  onSpiritChange(player: any) {
    if (!player.spiritId) {
      player.aspectId = null;
      player.availableAspects = [];
      return;
    }

    this.spiritsService.getAspectsForSpirit(player.spiritId).subscribe((aspects) => {
      player.availableAspects = aspects;

      if (!aspects.some((a) => a.id === player.aspectId)) {
        player.aspectId = null;
      }
    });
  }

  savePlayer(player: any) {
    this.playersService
      .updatePlayer(player.id, {
        spiritId: player.spiritId,
        aspectId: player.aspectId,
        notes: player.notes,
      })
      .subscribe(() => {
        alert('Zapisano zmiany!');
      });
  }
}
