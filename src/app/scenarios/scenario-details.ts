
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ScenarioService,
  Scenario,
} from '../services/scenario.service';

@Component({
  selector: 'app-scenario-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scenario-details.html',
  styleUrls: ['./scenario-details.scss'],
})
export class ScenarioDetails implements OnInit {
  scenario: Scenario | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private scenarioService: ScenarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.error = 'Nieprawidłowy identyfikator scenariusza.';
      this.loading = false;
      return;
    }

    this.scenarioService.getScenario(id).subscribe({
      next: (data) => {
        this.scenario = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd ładowania scenariusza:', err);
        this.error = 'Nie można załadować scenariusza.';
        this.loading = false;
      },
    });
  }
}
