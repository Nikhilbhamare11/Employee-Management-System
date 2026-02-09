import { Component, inject, signal } from '@angular/core';
import { employee } from '../service/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
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
}
