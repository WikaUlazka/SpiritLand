import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScenarioService, Scenario } from '../services/scenario.service';

@Component({
  selector: 'app-scenario-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenario-details.html',
  styleUrls: ['./scenario-details.scss'],
})
export class ScenarioDetails implements OnInit {
  scenario: Scenario | null = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private scenarioService: ScenarioService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.scenarioService.getScenario(id).subscribe({
      next: (data) => {
        this.scenario = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Błąd ładowania scenariusza';
        this.loading = false;
      },
    });
  }
}
