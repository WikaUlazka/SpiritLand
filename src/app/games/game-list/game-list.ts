import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Player {
  username: string;
}

interface Game {
  date: string;
  result: string;
  players: Player[];
}

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList {
  games: Game[] = [];
  newGame: Game = { date: '', result: '', players: [] };
  newPlayer: string = '';

  addPlayer() {
    if (this.newPlayer.trim()) {
      this.newGame.players.push({ username: this.newPlayer });
      this.newPlayer = '';
    }
  }

  addGame() {
    if (this.newGame.date && this.newGame.players.length > 0) {
      this.games.push({ ...this.newGame });
      this.newGame = { date: '', result: '', players: [] };
    }
  }
}
