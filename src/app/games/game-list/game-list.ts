import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss'],
})
export class GameList {
  games: any[] = [];

  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit() {
    this.gamesService.getUserGames().subscribe((res: any[]) => {
      this.games = res;
    });
  }

  openGame(id: number) {
    this.router.navigate(['/games', id]);
  }

  editGame(id: number) {
    this.router.navigate(['/games/edit', id]);
  }

  deleteGame(id: number) {
    if (confirm('Usunąć tę grę?')) {
      this.gamesService.deleteGame(id).subscribe(() => {
        this.games = this.games.filter((g) => g.id !== id);
      });
    }
  }
}
