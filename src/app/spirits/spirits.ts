import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpiritService, Spirit } from '../services/spirit.service';

@Component({
  selector: 'app-spirits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spirits.html',
  styleUrls: ['./spirits.scss'],
})
export class Spirits implements OnInit {
  spirits: Spirit[] = [];
  loading = true;
  error = '';

  constructor(private spiritService: SpiritService) {}

  ngOnInit() {
    console.log('📡 Inicjalizacja komponentu Spirits...');

    this.spiritService.getSpirits().subscribe({
      next: (data) => {
        console.log('✅ Odebrano dane z API:', data);
        this.spirits = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Błąd pobierania duchów:', err);
        this.error = 'Błąd ładowania duchów';
        this.loading = false;
      },
    });
  }
}
