import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GamesService } from '../../services/games.service';
import { AdversariesService } from '../../services/adversaries.service';
import { ScenarioService } from '../../services/scenario.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { SpiritsService } from '../../services/spirits.service';
import { AspectsService } from '../../services/aspects.service';

import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-form.html',
  styleUrls: ['./game-form.scss'],
})
export class GameForm {
  public gameId: number | null = null;
  public creatorUserId: number = 0;

  public game: Game = {
    datePlayed: new Date().toISOString().slice(0, 10),
    result: 'win',
    blightedIsland: false,
    adversaryId: null,
    adversaryLevelId: null,
    scenarioId: null,
    difficulty: null,
    boardSetup: '',
    endReason: '',
    turns: null,
    comment: '',
    players: [],
    creatorUserId: 0,
  };

  adversaries: any[] = [];
  scenarios: any[] = [];
  users: any[] = [];
  spirits: any[] = [];
  aspects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private adversariesService: AdversariesService,
    private scenarioService: ScenarioService,
    private auth: AuthService,
    private usersService: UsersService,
    private spiritsService: SpiritsService,
    private aspectsService: AspectsService
  ) {}

  ngOnInit() {
    this.creatorUserId = this.auth.getCurrentUserId()!;
    this.game.creatorUserId = this.creatorUserId;

    this.loadStatic();
    this.loadUsers();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.gameId = Number(id);
      this.gamesService.getGame(this.gameId).subscribe((g) => {
        this.game = {
          ...g,
          datePlayed: g.datePlayed.slice(0, 10),
          players: g.players || [],
        };
      });
    }
  }

  loadUsers() {
    this.usersService.getUsers().subscribe((u) => {
      this.users = u;
    });
  }

  loadStatic() {
    this.adversariesService.getAdversaries().subscribe((d) => (this.adversaries = d));
    this.scenarioService.getScenarios().subscribe((d) => (this.scenarios = d));

    this.spiritsService.getSpirits().subscribe((s) => {
      this.spirits = s;
    });
  }

  onSpiritSelected(playerIndex: number) {
    const spiritId = this.game.players[playerIndex].spiritId;

    if (!spiritId) {
      this.aspects = [];
      return;
    }

    this.aspectsService.getAspectsForSpirit(spiritId).subscribe((a) => {
      this.game.players[playerIndex].aspectId = null;
      this.aspects = a;
    });
  }

  addPlayer() {
    this.game.players.push({
      userId: null,
      spiritId: null,
      aspectId: null,
      notes: null,
    });
  }

  removePlayer(i: number) {
    this.game.players.splice(i, 1);
  }

  save() {
    for (const p of this.game.players) {
      if (!p.userId) {
        alert('Każdy gracz musi mieć wybranego użytkownika.');
        return;
      }
    }

    const payload: Game = {
      id: this.gameId ?? undefined,
      creatorUserId: this.creatorUserId,
      datePlayed: new Date(this.game.datePlayed + 'T00:00:00Z').toISOString(),
      adversaryId: this.game.adversaryId ?? null,
      scenarioId: this.game.scenarioId ?? null,
      difficulty: this.game.difficulty ?? null,
      boardSetup: this.game.boardSetup || null,
      result: this.game.result,
      endReason: this.game.endReason || null,
      turns: this.game.turns ?? null,
      comment: this.game.comment || null,
      blightedIsland: this.game.blightedIsland,
      players: this.game.players.map((p) => ({
        id: p.id ?? 0,
        userId: p.userId!,
        spiritId: p.spiritId ?? null,
        aspectId: p.aspectId ?? null,
        notes: p.notes ?? null,
      })),
    };

    const req = this.gameId
      ? this.gamesService.updateGame(this.gameId, payload)
      : this.gamesService.createGame(payload);

    req.subscribe({
      next: () => this.router.navigate(['/games']),
      error: (err) => {
        console.error('BACKEND ERROR:', err);
        alert('Błąd zapisu: ' + JSON.stringify(err.error));
      },
    });
  }
}
