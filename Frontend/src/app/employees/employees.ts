import { Component, inject } from '@angular/core';
import { employee } from '../service/employee';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  private e = inject(employee);

  employees: any[] = [];
  isLoading = true;
  apiError = false;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;

    this.e.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },

      error: (err) => {
        console.error(err);
        this.apiError = true;
        this.isLoading = false;
      }
    });
  }
}
