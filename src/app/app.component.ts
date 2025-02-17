import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Management App';
  isLoggedIn = false;
  employeeName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in on initialization
    this.isLoggedIn = this.authService.isLoggedIn();
    this.employeeName = this.authService.getEmployeeName();
  }

  // Logout method to clear the session
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.employeeName = null;
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

}
