
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdversariesService, Adversary } from '../services/adversaries.service';

@Component({
  selector: 'app-adversaries',
  standalone: true,
  templateUrl: './adversaries.html',
  styleUrls: ['./adversaries.scss'],
  imports: [CommonModule, FormsModule],
})
export class Adversaries implements OnInit {
  adversaries: Adversary[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  selectedAdversary: Adversary | null = null;

  constructor(private adversaryService: AdversariesService) {}

  get filteredAdversaries(): Adversary[] {
    const term = this.searchTerm.trim().toLocaleLowerCase();

    return this.adversaries.filter((adversary) =>
      adversary.name.toLocaleLowerCase().includes(term)
    );
  }

  ngOnInit(): void {
    this.loadAdversaries();
  }

  loadAdversaries(): void {
    this.loading = true;
    this.error = '';

    this.adversaryService.getAdversaries().subscribe({
      next: (data) => {
        this.adversaries = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd ładowania przeciwników:', err);
        this.error = 'Nie udało się pobrać listy przeciwników.';
        this.loading = false;
      },
    });
  }

  openPreview(adversary: Adversary): void {
    this.selectedAdversary = adversary;
    document.body.style.overflow = 'hidden';
  }

  closePreview(): void {
    this.selectedAdversary = null;
    document.body.style.overflow = '';
  }
}
