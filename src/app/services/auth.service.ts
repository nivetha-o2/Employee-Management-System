import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Login method
  login(employeeName: string, password: string): Observable<any> {
    const body = { employeeName, password };

    return this.http.post(`${this.apiUrl}/login`, body, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token); // Store token
        }
        if (response.employeeName) {
          this.setEmployeeName(response.employeeName);
           
        }console.log("local storage", response.employeeName);// Store employeeName
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );
  }

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Store employeeName in localStorage
  setEmployeeName(employeeName: string): void {
    console.log('Setting employeeName:', employeeName); 
    localStorage.setItem('employeeName', employeeName);
  }

  // Retrieve employeeName from localStorage
  getEmployeeName(): string | null {
    const name = localStorage.getItem('employeeName');
    console.log('Getting employeeName:', name); 
    return name;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; 
  }

  // Logout and clear localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeName');
  }
}
