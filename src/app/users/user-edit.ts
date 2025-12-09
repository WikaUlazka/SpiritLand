import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpiritsService, Spirit, Aspect } from '../services/spirits.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.html',
  styleUrls: ['./user-edit.scss'],
  imports: [CommonModule, FormsModule],
})
export class UserEdit implements OnInit {
  user: any = null;
  spirits: Spirit[] = [];
  aspects: Aspect[] = [];
  loading = true;

  constructor(
    private auth: AuthService,
    private spiritService: SpiritsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spiritService.getSpirits().subscribe((spirits) => {
      this.spirits = spirits || [];
      this.auth.getProfile().subscribe((user) => {
        this.user = user;
        this.loading = false;
        this.updateAspects();
      });
    });
  }

  updateAspects() {
    const spiritId = Number(this.user?.favoriteSpiritId);
    if (!spiritId) {
      this.aspects = [];
      this.user.favoriteAspectId = null;
      return;
    }

    this.spiritService.getAspectsForSpirit(spiritId).subscribe({
      next: (asps) => {
        this.aspects = Array.isArray(asps) ? asps : [];
        if (!this.aspects.some((a) => a.id === Number(this.user.favoriteAspectId))) {
          this.user.favoriteAspectId = null;
        }
      },
      error: () => {
        this.aspects = [];
        this.user.favoriteAspectId = null;
      },
    });
  }

  onSpiritChange() {
    this.updateAspects();
  }

  save() {
    const payload = {
      username: this.user.username,
      favoriteSpiritId: Number(this.user.favoriteSpiritId) || null,
      favoriteAspectId: Number(this.user.favoriteAspectId) || null,
    };

    this.auth.updateProfile(payload).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
