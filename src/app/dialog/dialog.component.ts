import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  experienceList = ["Fresher", "Experienced"];
  employeeForm!: FormGroup;
  actionBtn: string = "Save";

  @Output() employeeAdded = new EventEmitter<void>(); // Event emitter to notify parent component

  constructor(
    private formBuilder: FormBuilder,
    private api: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      category: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      salary: ['', Validators.required],
      performanceReview: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    
    });

    // If we're editing an existing employee, populate the form
    if (this.editData) {
      this.actionBtn = "Update";
      this.employeeForm.get('password')?.disable();
      this.employeeForm.patchValue(this.editData); // Populate form with data for editing
      
    }
  }

  // Add or update employee depending on the context
  addEmployee(): void {
    if (!this.editData) {  // If there is no editData, it means we're adding a new employee
      if (this.employeeForm.valid) {
        const payload = {
          ...this.employeeForm.value,
          context: 'dialog', 
        };
        this.api.postEmployee(payload).subscribe({
          next: (res) => {
            alert("Employee details added successfully");
            this.employeeForm.reset();  
            this.dialogRef.close('save'); 
            this.employeeAdded.emit();  // Notify the parent to refresh employee list
          },
          error: (err) => {
            console.error('Error while adding employee:', err);
            alert("Error occurred while adding employee");
          }
        });
      }
    } else {
      this.updateEmployee(); 
    }
  }

  // Update employee details
  updateEmployee(): void {
    if (this.editData && this.editData._id) {
      // Ensure _id  whether exists  or not
      console.log("Updating employee with ID:", this.editData._id);
      
    const { password, ...formData } = this.employeeForm.value;

      this.api.putEmployee(this.employeeForm.value, this.editData._id).subscribe({
        next: (res) => {
          alert("Employee details updated successfully");
          this.employeeForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.error("Error while updating employee:", err);
          alert("Error while updating the record");
        },
      });
    } else {
      alert("Employee ID (_id) is missing or undefined!");
      console.error("Error: _id is not defined in editData");
    }
  }
}
