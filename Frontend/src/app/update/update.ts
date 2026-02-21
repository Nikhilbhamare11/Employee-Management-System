import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { employee } from '../service/employee';

@Component({
  selector: 'app-update',
  imports: [FormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
  newEmployee: any = { id: null, name: '', a: { building_no: '', landmark: '', pincode: null } };

  private e = inject(employee);
  idNotFound: boolean = false;
  idFound: boolean = false;

  fetchEmployee() {
    const searchId = this.newEmployee.id;
    if (!searchId) return;

    this.e.getEmpById(searchId).subscribe({
      next: (data) => {
        if (data) {
          // Fill the form with database data
          this.newEmployee = data;
          this.idNotFound = false;
          this.idFound = true;
        } else {
          this.handleNotFound();
        }
      },
      error: (err) => {
        this.handleNotFound();
      }
    });
  }

  handleNotFound() {
    this.idNotFound = true;
    this.idFound = false;
    // Keep the ID but clear other fields so the user doesn't edit wrong data
    const currentId = this.newEmployee.id;
    this.newEmployee = { id: currentId, name: '', a: { building_no: '', landmark: '', pincode: null } };
  }

  onSubmit(form: any) {
    if (form.valid && !this.idNotFound) {
      // Step 1: Update Address
      this.e.saveAddress(this.newEmployee.a).subscribe({
        next: (addrRes) => {
          console.log("Address saved successfully");

          // Step 2: Once address is saved, save the Employee
          this.e.saveEmployee(this.newEmployee).subscribe({
            next: (empRes) => {
              alert("Both Employee and Address added successfully!");
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
  }

  resetForm() {
    this.newEmployee = { id: 0, name: '', a: { id: 0, pincode: 0, landmark: '', building_no: '' } };
  }
}

