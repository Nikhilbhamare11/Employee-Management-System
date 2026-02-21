import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class employee {
  private http = inject(HttpClient); // Modern way to inject
  private empUrl = 'http://localhost:8081/emp'; // Port where Emp service runs
  private addUrl = 'http://localhost:8082/add'; // Port where Address service runs

  getEmpById(id: number): Observable<any> {
    return this.http.get(`${this.empUrl}/${id}`);
  }

  // Method 1: Save Employee
  saveEmployee(empData: any): Observable<any> {
    return this.http.post(this.empUrl, empData);
  }

  // Method 2: Save Address
  saveAddress(addrData: any): Observable<any> {
    return this.http.post(this.addUrl, addrData);
  }

  updateEmp(id: any, newEmployee: any) {
    throw new Error('Method not implemented.');
  }

  updateAddress(id: any, a: any) {
    throw new Error('Method not implemented.');
  }

}