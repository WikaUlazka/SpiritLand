import { Component, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SpiritsService, Spirit, Aspect } from '../services/spirits.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  imports: [CommonModule, DatePipe],
})
export class User implements OnInit {
  user: any = null;
  spirits: Spirit[] = [];
  aspects: Aspect[] = [];
  loading = true;
  error: string | null = null;

  favoriteSpiritName: string | null = null;
  favoriteAspectName: string | null = null;

  constructor(private auth: AuthService, private spiritService: SpiritsService) {}

  ngOnInit() {
    this.spiritService.getSpirits().subscribe((spirits) => {
      this.spirits = spirits;

      this.auth.getProfile().subscribe((user) => {
        this.user = user;
        this.loadAspectForUser(user.favoriteSpiritId);
        this.resolveNames();
        this.loading = false;
      });
    });
  }

  resolveNames() {
    const spirit = this.spirits.find((s) => s.id === this.user.favoriteSpiritId);
    this.favoriteSpiritName = spirit ? spirit.name : '—';
  }

  loadAspectForUser(spiritId: number | null) {
    if (!spiritId) {
      this.favoriteAspectName = '—';
      return;
    }

    this.spiritService.getAspectsForSpirit(spiritId).subscribe((asps) => {
      this.aspects = asps;

      const aspect = asps.find((a) => a.id === this.user.favoriteAspectId);
      this.favoriteAspectName = aspect ? aspect.name : '—';
    });
  }
}
