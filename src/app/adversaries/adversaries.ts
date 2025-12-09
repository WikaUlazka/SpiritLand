import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdversariesService, Adversary } from '../services/adversaries.service';

@Component({
  selector: 'app-adversaries',
  standalone: true,
  templateUrl: './adversaries.html',
  styleUrls: ['./adversaries.scss'],
  imports: [CommonModule],
})
export class Adversaries implements OnInit {
  adversaries: Adversary[] = [];
  loading = true;
  error = '';

  constructor(private adversaryService: AdversariesService) {}

  ngOnInit() {
    console.log('📡 Inicjalizacja komponentu Adversaries...');
    this.loadAdversaries();
  }

  loadAdversaries() {
    this.adversaryService.getAdversaries().subscribe({
      next: (data) => {
        console.log('✅ Odebrano przeciwników:', data);
        this.adversaries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Błąd API:', err);
        this.error = 'Błąd ładowania przeciwników';
        this.loading = false;
      },
    });
  }
}
