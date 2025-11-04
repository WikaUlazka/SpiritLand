import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  user: any = null;

  ghosts = [
    { name: 'Aetherion', desc: 'Duch powietrza, szybki i nieuchwytny.' },
    { name: 'Mournshade', desc: 'Duch cienia, manipuluje ciemnością.' },
    { name: 'Pyrelith', desc: 'Duch ognia, nieprzewidywalny i potężny.' },
    { name: 'Eclipsera', desc: 'Duch równowagi, kontroluje dzień i noc.' },
  ];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) this.user = JSON.parse(storedUser);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.user = null;
  }
}
