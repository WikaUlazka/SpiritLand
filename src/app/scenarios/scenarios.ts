import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScenarioService, Scenario } from '../services/scenario.service';

@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './scenarios.html',
  styleUrls: ['./scenarios.scss'],
})
export class Scenarios implements OnInit {
  scenarios: Scenario[] = [];
  loading = true;
  error = '';
  search = '';

  constructor(private scenarioService: ScenarioService) {}

  ngOnInit() {
    this.loadScenarios();
  }

  get filteredScenarios(): Scenario[] {
    return this.scenarios.filter((s) => s.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  loadScenarios() {
    this.scenarioService.getScenarios().subscribe({
      next: (data) => {
        this.scenarios = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Błąd ładowania scenariuszy';
        this.loading = false;
      },
    });
  }
}
