import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router,  RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      this.loginError = false;
      this.authService.authenticate(this.loginForm.value).subscribe({
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
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
