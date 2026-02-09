import { Component, inject, signal } from '@angular/core';
import { employee } from '../service/employee';
import { FormsModule } from '@angular/forms';

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

  // Object to hold form data
  newEmployee = {
    id: 0,
    name: '',
    a: {
      id: 0,
      pincode: 0,
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
  }

  // 2. Save Logic
  onSubmit() {
    // Ensure they are synced one last time before saving
    this.syncIds();
    // Step 1: Save the Address first (since Employee depends on it)
    this.e.saveAddress(this.newEmployee.a).subscribe({
      next: (addrRes) => {
        console.log("Address saved successfully");

        // Step 2: Once address is saved, save the Employee
        this.e.saveEmployee(this.newEmployee).subscribe({
          next: (empRes) => {
            alert("Both Employee and Address added successfully!");
            this.resetForm();
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

  resetForm() {
    this.newEmployee = { id: 0, name: '', a: { id: 0, pincode: 0, landmark: '', building_no: '' } };
  }
}
