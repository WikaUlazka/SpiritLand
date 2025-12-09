import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      alert('Wszystkie pola są wymagane!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Hasła się nie zgadzają!');
      return;
    }

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password, 
    };

    this.auth.register(payload).subscribe({
      next: () => {
        alert(`Konto ${this.username} zostało zarejestrowane!`);
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        console.error(err);
        alert('Rejestracja nie powiodła się!');
      },
    });
  }
}
