import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GamesService,
  SpiritStat
} from '../services/games.service';

@Component({
  standalone: true,
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrls: ['./stats.scss'],
})
export class Stats implements OnInit {

  stats: SpiritStat[] = [];

  loading = true;
  error = '';

  totalGames = 0;
  totalWins = 0;
  totalLosses = 0;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';

    this.gamesService.getUserStats().subscribe({
      next: (data: SpiritStat[]) => {
        this.stats = data;

        this.totalGames = data.reduce(
          (sum: number, spirit: SpiritStat) => sum + spirit.played,
          0
        );

        this.totalWins = data.reduce(
          (sum: number, spirit: SpiritStat) => sum + spirit.wins,
          0
        );

        this.totalLosses = data.reduce(
          (sum: number, spirit: SpiritStat) => sum + spirit.losses,
          0
        );

        this.loading = false;
      },

      error: (err: any) => {
        console.error('Błąd pobierania statystyk:', err);

        this.error = 'Nie udało się pobrać statystyk.';
        this.loading = false;
      }
    });
  }

  getWinRate(stat: SpiritStat): number {
    if (stat.played === 0) {
      return 0;
    }

    return Math.round((stat.wins / stat.played) * 100);
  }

  getBarWidth(stat: SpiritStat): number {
    if (this.totalGames === 0) {
      return 0;
    }

    return (stat.played / this.totalGames) * 100;
  }
}