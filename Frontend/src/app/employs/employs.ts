import { Component, inject, signal } from '@angular/core';
import { employee } from '../service/employee';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employs',
  imports: [FormsModule],
  templateUrl: './employs.html',
  styleUrl: './employs.css',
})
export class Employs {
  private e = inject(employee);

  searchId: number = 0;
  foundEmployee = signal<any>(null);
  isLoading = signal<boolean>(false);

  employeeExists = false;
  checking = false;

  // Object to hold form data
  newEmployee = {
    id: undefined,
    name: '',
    a: {
      id: undefined,
      pincode: undefined,
      landmark: '',
      building_no: ''
    }
  };

  // 1. Search Logic
  searchEmployee() {
    if (this.searchId <= 0) return alert("Employee Not Found!");

    this.isLoading.set(true);
    this.foundEmployee.set(null);

    this.e.getEmpById(this.searchId).subscribe({
      next: (data) => setTimeout(() => {
        this.foundEmployee.set(data);
        this.isLoading.set(false);
      }, 1500),
      error: (err) => {
        alert("Employee Not Found!");
        this.foundEmployee.set(null);
        this.isLoading.set(false);
      }
    });
  }

  // Helper method to sync IDs automatically
  syncIds() {
    this.newEmployee.a.id = this.newEmployee.id;
    if (!this.newEmployee.id) return;
    this.checking = true;

    this.e.getEmpById(this.newEmployee.id).subscribe({
      next: (res) => {
        // Employee FOUND
        this.employeeExists = true;
        this.checking = false;
      },
      error: () => {
        // Employee NOT FOUND
        this.employeeExists = false;
        this.checking = false;
      }

    });
  }

  // 2. Save Logic
  onSubmit(form: NgForm) {
    this.syncIds();
    const targetId = this.newEmployee.id;

    if (!targetId) {
      alert("Enter valid Employee ID");
      return;
    }

    if (form.invalid) {
      alert("Please fill in all required information before submitting.");
      return;
    }

    this.e.getEmpById(targetId).subscribe({
      next: (e) => {
        // If the Employee EXISTS.
        if (e) {
          alert(`Error: ID ${targetId} is already taken by ${e.name}.`);
        }
        else {
          this.onSave(form);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          console.log("ID is unique, proceeding with registration...");
          this.onSave(form);
        } else {
          console.error("Database Error:", err);
          alert("Connection error. Please try again later.");
        }
      }
    });
  }

  onSave(form: NgForm) {
    if (!this.newEmployee || !this.newEmployee.a) {
      alert("Address missing....!!");
      return;
    }
    // Step 3: Save the Address first (since Employee depends on it)
    this.e.saveAddress(this.newEmployee.a).subscribe({
      next: (addrRes) => {
        console.log("Address saved successfully");
        // Step 2: Once address is saved, save the Employee
        this.e.saveEmployee(this.newEmployee).subscribe({
          next: (empRes) => {
            alert("Both Employee and Address added successfully!");
            this.resetForm(form);
          },
          error: (err) => console.error("Employee Save Failed", err)
        });
      },
      error: (err) => {
        console.error("Address Save Failed", err);
        alert("Could not save address. Employee registration stopped.");
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newEmployee = {
      id: undefined,
      name: '',
      a: {
        id: undefined,
        pincode: undefined,
        landmark: '',
        building_no: ''
      }
    };
    this.employeeExists = false;
    this.checking = false;
  }
}
