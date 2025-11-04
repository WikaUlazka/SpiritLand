import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Podaj e-mail i hasło');
      return;
    }

    // 🔹 Symulacja logowania — zapisujemy użytkownika w localStorage
    const user = { username: this.email.split('@')[0] };
    localStorage.setItem('user', JSON.stringify(user));

    // 🔹 Przekierowanie na stronę główną
    this.router.navigate(['/home']);
  }
}
