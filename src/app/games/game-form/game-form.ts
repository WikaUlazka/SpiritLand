import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-form.html',
  styleUrls: ['./game-form.scss'],
})
export class GameFormComponent {
  newGame: Partial<Game> = {
    date: new Date(),
    players: [],
    result: 'win',
  };

  newPlayer = '';

  constructor(private gamesService: GamesService) {}

  addPlayer() {
    if (this.newPlayer.trim() !== '') {
      this.newGame.players?.push({ username: this.newPlayer, spirit: '' });
      this.newPlayer = '';
    }
  }

  addGame() {
    if (!this.newGame.players?.length) return alert('Dodaj przynajmniej jednego gracza!');
    this.gamesService.add(this.newGame as Game);
    alert('Gra zapisana!');
    this.newGame = { date: new Date(), players: [], result: 'win' };
  }
}
