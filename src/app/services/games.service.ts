import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private games: Game[] = [];

  constructor() {
    const saved = localStorage.getItem('games');
    if (saved) this.games = JSON.parse(saved);
  }

  getAll(): Game[] {
    return this.games;
  }

  add(game: Game) {
    game.id = this.games.length + 1;
    this.games.push(game);
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  remove(id: number) {
    this.games = this.games.filter((g) => g.id !== id);
    localStorage.setItem('games', JSON.stringify(this.games));
  }
}
