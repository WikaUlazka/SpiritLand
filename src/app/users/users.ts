
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { SpiritsService, Spirit, Aspect } from '../services/spirits.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  imports: [CommonModule, DatePipe, RouterLink],
})
export class User implements OnInit {
  user: any = null;
  spirits: Spirit[] = [];
  aspects: Aspect[] = [];

  loading = true;
  error: string | null = null;

  favoriteSpiritName: string | null = null;
  favoriteAspectName: string | null = null;

  constructor(
    private auth: AuthService,
    private spiritService: SpiritsService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      spirits: this.spiritService.getSpirits(),
      user: this.auth.getProfile(),
    }).subscribe({
      next: ({ spirits, user }) => {
        this.spirits = spirits;
        this.user = user;

        this.resolveNames();
        this.loadAspectForUser(user.favoriteSpiritId);
      },
      error: (err) => {
        console.error('Błąd pobierania profilu:', err);
        this.error = 'Nie udało się pobrać danych. Spróbuj ponownie.';
        this.loading = false;
      },
    });
  }

  resolveNames(): void {
    const spirit = this.spirits.find(
      (s) => s.id === this.user?.favoriteSpiritId
    );

    this.favoriteSpiritName = spirit?.name ?? '—';
  }

  loadAspectForUser(spiritId: number | null): void {
    if (!spiritId || !this.user?.favoriteAspectId) {
      this.favoriteAspectName = '—';
      this.loading = false;
      return;
    }

    this.spiritService.getAspectsForSpirit(spiritId).subscribe({
      next: (aspects) => {
        this.aspects = aspects;

        const aspect = aspects.find(
          (a) => a.id === this.user.favoriteAspectId
        );

        this.favoriteAspectName = aspect?.name ?? '—';
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania aspektów:', err);
        this.favoriteAspectName = '—';
        this.loading = false;
      },
    });
  }
}
