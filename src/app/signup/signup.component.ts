

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  experienceList = ['Fresher', 'Experienced'];
  signupForm!: FormGroup;
  actionBtn: string = 'Sign Up';

  constructor(
    private formBuilder: FormBuilder,
    private api: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.signupForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      category: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      performanceReview: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
     
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      const payload = {
        ...this.signupForm.value,
        context: 'signup', 
      };
  
      console.log('Signup Payload:', payload); 
      this.api.postEmployee(payload).subscribe({
        next: (res) => {
          alert('Signup successful! Redirecting to login page.');
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error during signup:', err.message || err);
          console.error('Payload sent to server:', this.signupForm.value); 
          alert(err.error?.message || 'An error occurred during signup. Please try again.');
        },
      });
    } 
  
     else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors(): void {
    Object.keys(this.signupForm.controls).forEach((field) => {
      const control = this.signupForm.get(field);
      if (control?.invalid) {
        const errors = control.errors;
        console.error(`Field "${field}" validation errors:`, errors);
      }
    });
    alert('Please fill out the form correctly.');
  }
}






















 // password: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(6),
      //     Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/), // Example: 1 uppercase, 1 lowercase, 1 number
      //   ],
      // ],