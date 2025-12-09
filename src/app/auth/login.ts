import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule],
})
export class Login {
  email = '';
  password = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Uzupełnij wszystkie pola!');
      return;
    }

    this.loading = true;

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        console.log('LOGIN RESPONSE:', res);

        this.auth.saveToken(res.token);

        if (res.user) {
          this.auth.saveUser(res.user);
        } else {
          this.auth.getProfile().subscribe((profile) => {
            this.auth.saveUser(profile);
          });
        }

        this.email = '';
        this.password = '';

        this.loading = false;

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        console.error('LOGIN ERROR:', err);
        alert('Nieprawidłowe dane logowania');
      },
    });
  }
}
