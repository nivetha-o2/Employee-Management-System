import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      employeeName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const { employeeName, password } = this.loginForm.value;

    
    console.log('Login request data:', { employeeName, password });

    this.authService.login(employeeName, password).subscribe({
      next: (response) => {
        if (response && response.token) {
          console.log('Login successful:', response);

          
          localStorage.setItem('token', response.token);
          localStorage.setItem('employeeName', employeeName);
          
          this.router.navigate(['/app']);
        } else {
          console.error('Unexpected response:', response);
          this.errorMessage = 'Unexpected server response. Please try again.';
        }
      },
      error: (error) => {
        console.error('Login failed:', error);

        
        if (error.status === 400) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      },
    });
  }
}
