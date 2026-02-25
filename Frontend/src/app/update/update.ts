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
  idNotFound = false;
  idFound = false;
  checking = false;

  handleNotFound() {
    this.idNotFound = true;
    this.idFound = false;
    const currentId = this.newEmployee.id;
    this.newEmployee = { id: currentId, name: '', a: { building_no: '', landmark: '', pincode: null } };
    alert("Employee Data Not Found!")
  }

  resetForm() {
    this.newEmployee = {
      id: '',
      name: '',
      a: {
        id: undefined,
        pincode: undefined,
        landmark: '',
        building_no: ''
      }
    };
    this.idFound = false;
    this.checking = false;
  }

  fetchEmployee() {
    const searchId = this.newEmployee.id;
    if (!searchId) return;
    this.checking = true;

    this.e.getEmpById(searchId).subscribe({
      next: (data) => {
        if (data) {
          // Fill the form with database data
          this.newEmployee = data;
          this.idNotFound = false;
          this.idFound = true;
          this.checking = false;
        } else {
          this.handleNotFound();
          this.checking = false;
          this.idNotFound = true;
        }
      },
      error: (err) => {
        this.handleNotFound();
        this.checking = false;
        this.idNotFound = true;
      }
    });
  }

  onSubmit(form: any) {
    if (form.valid && !this.idNotFound) {
      // Step 1: Update Address
      // console.log(this.newEmployee.id);
      this.e.updateAddress(this.newEmployee.id, this.newEmployee.a).subscribe({
        next: (addrRes) => {
          // console.log("Address saved successfully");
          // Step 2: Once address is saved, save the Employee
          this.e.updateEmp(this.newEmployee.id, this.newEmployee).subscribe({
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
  }

  deleteEmpl(id: number) {
    this.e.deleteEmp(id).subscribe({
      next: () => {
        this.e.deleteAdd(id).subscribe({
          next: () => {
            alert("Employee and Address deleted successfully");
            this.resetForm();
          },
          error: () => alert("Employee deleted but Address delete failed")
        });
      },
      error: (err) => {
        console.error(err);
        alert("Employee and Address Delete failed");
      }
    });
    this.resetForm();
  }

  confirmDelete() {
    const confirmAction = confirm(
      `Are you sure you want to delete Employee ID ${this.newEmployee.id}?`
    );
    if (confirmAction) {
      this.deleteEmpl(this.newEmployee.id);
    }
  }
}
