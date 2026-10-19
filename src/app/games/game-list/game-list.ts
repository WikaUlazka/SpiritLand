
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, FormsModule],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss'],
})
export class GameList implements OnInit {
  games: any[] = [];

  loading = true;
  error: string | null = null;

  searchTerm = '';
  resultFilter: 'all' | 'win' | 'loss' = 'all';

  constructor(
    private gamesService: GamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;
    this.error = null;

    this.gamesService.getUserGames().subscribe({
      next: (res: any[]) => {
        this.games = Array.isArray(res) ? res : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania gier:', err);
        this.error = 'Nie udało się pobrać listy gier. Spróbuj ponownie.';
        this.loading = false;
      },
    });
  }

  get winsCount(): number {
    return this.games.filter(
      (g) => String(g.result).toLowerCase() === 'win'
    ).length;
  }

  get lossesCount(): number {
    return this.games.filter(
      (g) => String(g.result).toLowerCase() === 'loss'
    ).length;
  }

  get winRate(): number {
    const finishedGames = this.winsCount + this.lossesCount;

    if (finishedGames === 0) {
      return 0;
    }

    return Math.round((this.winsCount / finishedGames) * 100);
  }

  get filteredGames(): any[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.games.filter((game) => {
      const result = String(game.result ?? '').toLowerCase();

      const matchesResult =
        this.resultFilter === 'all' ||
        result === this.resultFilter;

      const searchableText = [
        game.id,
        game.adversaryName,
        game.scenarioName,
        game.datePlayed,
        game.difficulty,
      ]
        .map((value) => String(value ?? ''))
        .join(' ')
        .toLowerCase();

      return matchesResult && searchableText.includes(term);
    });
  }

  getResultLabel(result: string | null | undefined): string {
    switch (String(result ?? '').toLowerCase()) {
      case 'win':
        return 'Wygrana';
      case 'loss':
        return 'Przegrana';
      default:
        return result || 'Brak wyniku';
    }
  }

  getResultClass(result: string | null | undefined): string {
    switch (String(result ?? '').toLowerCase()) {
      case 'win':
        return 'win';
      case 'loss':
        return 'loss';
      default:
        return 'other';
    }
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.resultFilter = 'all';
  }

  openGame(id: number): void {
    this.router.navigate(['/games', id]);
  }

  editGame(id: number): void {
    this.router.navigate(['/games/edit', id]);
  }

  deleteGame(id: number): void {
    if (!confirm(`Czy na pewno chcesz usunąć rozgrywkę #${id}?`)) {
      return;
    }

    this.gamesService.deleteGame(id).subscribe({
      next: () => {
        this.games = this.games.filter((game) => game.id !== id);
      },
      error: (err) => {
        console.error('Błąd usuwania gry:', err);
        alert('Nie udało się usunąć gry. Spróbuj ponownie.');
      },
    });
  }
}
