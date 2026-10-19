
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpiritsService, Spirit } from '../services/spirits.service';

@Component({
  selector: 'app-spirits',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './spirits.html',
  styleUrls: ['./spirits.scss'],
})
export class Spirits implements OnInit {
  spirits: Spirit[] = [];
  filteredSpirits: Spirit[] = [];

  loading = true;
  error = '';
  searchTerm = '';

  constructor(private spiritsService: SpiritsService) {}

  ngOnInit(): void {
    this.loadSpirits();
  }

  loadSpirits(): void {
    this.loading = true;
    this.error = '';

    this.spiritsService.getSpirits().subscribe({
      next: (data) => {
        this.spirits = Array.isArray(data) ? data : [];
        this.filterSpirits();
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd ładowania duchów:', err);
        this.error = 'Nie udało się pobrać listy duchów. Spróbuj ponownie.';
        this.loading = false;
      },
    });
  }

  filterSpirits(): void {
    const term = this.searchTerm.trim().toLocaleLowerCase();

    this.filteredSpirits = this.spirits.filter((spirit) =>
      (spirit.name ?? '').toLocaleLowerCase().includes(term)
    );
  }
}
