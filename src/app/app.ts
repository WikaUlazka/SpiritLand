import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [CommonModule, RouterModule],
})
export class App {
  user: any = null;

  constructor(public auth: AuthService) {
    this.loadUser();
  }

  loadUser() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
    this.user = null;
    window.location.href = '/';
  }
}
