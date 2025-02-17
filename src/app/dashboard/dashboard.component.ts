// dashboard.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Employee Dashboard';
  displayedColumns: string[] = ['employeeName', 'category', 'dateOfJoining', 'experienceLevel', 'salary', 'performanceReview', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  employeeName: string | null = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog, 
    private api: EmployeeService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeName = this.authService.getEmployeeName(); // Get the logged-in employee's name
    this.getAllEmployee(); // Fetch employees
  }

  // Open the dialog for adding a new employee
  openDialog() {
    if (this.employeeName === 'Admin') {
      this.dialog.open(DialogComponent, {
        width: '30%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllEmployee(); // Refresh employee list after adding
        }
      });
    }
  }

  // Fetch employees based on the user's role
  getAllEmployee() {
    this.api.getEmployee().subscribe({
      next: (res: any) => {
        if (this.employeeName === 'Admin') {
          this.dataSource = new MatTableDataSource(res); // Admin sees all employees
        } else {
          this.dataSource = new MatTableDataSource(
            res.filter((employee: any) => employee.employeeName === this.employeeName)
            
            // Others see only their own details
          );
          console.log('Non-admin Employee Name:', this.employeeName);
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error while fetching the records!');
      }
    });
  }

  // Open the dialog for editing an employee
  editEmployee(row: any) {
    const isEditable = this.employeeName === 'Admin' || row.employeeName === this.employeeName;
    if (isEditable) {
      this.dialog.open(DialogComponent, {
        width: '30%',
        data: row
      }).afterClosed().subscribe(val => {
        if (val === 'update') {
          this.getAllEmployee();
        }
      });
    }
  }

  // Delete an employee
  deleteEmployee(_id: string) {
    if (this.employeeName === 'Admin') {
      this.api.deleteEmployee(_id).subscribe({
        next: () => {
          alert('Employee detail deleted successfully');
          this.getAllEmployee();
        },
        error: () => {
          alert('Error while deleting the record');
        }
      });
    }
  }

  // Apply filter to the data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Log out the user
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
