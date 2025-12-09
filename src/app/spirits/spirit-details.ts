import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpiritsService, Spirit, Aspect } from '../services/spirits.service';

@Component({
  selector: 'app-spirit-details',
  standalone: true,
  templateUrl: './spirit-details.html',
  styleUrls: ['./spirit-details.scss'],
  imports: [CommonModule],
})
export class SpiritDetails implements OnInit {
  spirit: Spirit | null = null;
  aspects: Aspect[] = [];
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private spiritService: SpiritsService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Nieprawidłowy identyfikator ducha.';
      this.loading = false;
      return;
    }

    this.spiritService.getSpirit(id).subscribe({
      next: (spirit) => {
        this.spirit = spirit;
        this.loading = false;
        this.loadAspects(id);
      },
      error: () => {
        this.error = 'Nie można załadować ducha.';
        this.loading = false;
      },
    });
  }

  loadAspects(spiritId: number) {
    this.spiritService.getAspectsForSpirit(spiritId).subscribe({
      next: (aspects) => {
        this.aspects = Array.isArray(aspects) ? aspects : [];
      },
      error: () => {
        this.aspects = [];
      },
    });
  }
}
