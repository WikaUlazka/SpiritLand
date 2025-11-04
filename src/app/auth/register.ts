import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  register() {
    if (!this.username || !this.email || !this.password) {
      alert('Wszystkie pola są wymagane!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Hasła się nie zgadzają!');
      return;
    }

    console.log('Zarejestrowano:', {
      username: this.username,
      email: this.email,
    });

    alert(`Konto ${this.username} zostało zarejestrowane!`);
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
