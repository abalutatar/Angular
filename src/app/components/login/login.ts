import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signIn() {
    this.loginError = false;
    this.authService.authenticate(this.credentials).subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate(['/blog']);
        } else {
          this.loginError = true;
        }
      },
      error: () => {
        this.loginError = true;
      }
    });
  }
}
