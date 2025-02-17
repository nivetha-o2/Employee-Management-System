// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private api = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  // Get all employees
  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.api);
  }

  // Get employee by name 
  getEmployeeByName(employeeName: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}?employeeName=${employeeName}`);
  }

  // Add a new employee
  postEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.api, data);
    
    
  }
  

  // Update an existing employee
  putEmployee(data: Employee, id: string): Observable<Employee> {
    return this.http.patch<Employee>(`${this.api}/${id}`, data);
  }

  // Delete an employee
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
