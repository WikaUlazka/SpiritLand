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

  ngOnInit() {
    this.spiritsService.getSpirits().subscribe({
      next: (data) => {
        this.spirits = data;
        this.filteredSpirits = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Błąd ładowania duchów';
        this.loading = false;
      },
    });
  }

  filterSpirits() {
    const term = this.searchTerm.toLowerCase();

    this.filteredSpirits = this.spirits.filter((s) => s.name.toLowerCase().includes(term));
  }
}
