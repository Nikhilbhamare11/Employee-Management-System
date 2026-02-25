import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, Employee } from '../employee.model';

@Injectable({
  providedIn: 'root'
})

export class employee {
  private http = inject(HttpClient); // Modern way to inject
  private empUrl = 'http://localhost:8081/emp'; // Port where Emp service runs
  private addUrl = 'http://localhost:8082/add'; // Port where Address service runs


  // Method 1: Save Employee
  saveEmployee(empData: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.empUrl, empData);
  }

  // Save Address
  saveAddress(addrData: Address): Observable<Address> {
    return this.http.post<Address>(this.addUrl, addrData);
  }

  // Method 2: Update Employee
  updateEmp(id: number, newEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.empUrl}/${id}`, newEmployee);
  }

  // Update Address
  updateAddress(id: number, add: Address) {
    return this.http.put(`${this.addUrl}/${id}`, add);
  }

  // Method 3: Get Employee
  getEmpById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.empUrl}/${id}`);
  }

  // Method 4: Delete Employee
  deleteEmp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.empUrl}/${id}`);
  }

  // Delete Address
  deleteAdd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.addUrl}/${id}`);
  }

}