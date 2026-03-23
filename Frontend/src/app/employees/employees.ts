import { Component, inject } from '@angular/core';
import { employee } from '../service/employee';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  downloadPDF() {
    if (!this.employees || this.employees.length === 0) {
      alert("No data available. Please check server or try again later.");
      return;
    }

    const confirmDownload = confirm("Do you want to download the employee list PDF?");

    if (!confirmDownload) {
      return; // user clicked Cancel
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Employees List", 14, 15);
    const tableData = this.employees.map((emp: any) => [
      emp.id,
      emp.name,
      emp.a?.building_no,
      emp.a?.pincode,
      emp.a?.landmark
    ]);

    autoTable(doc, {
      head: [['ID', 'Name', 'Building No', 'Pincode', 'Area']],
      body: tableData,
      startY: 25
    });
    doc.save("employees-lists.pdf");
  }

  loadEmployees() {
    this.isLoading = true;
    this.apiError = false;

    this.e.getAllEmployees().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.employees = data;
      },
      error: (err) => {
        this.isLoading = false;
        this.apiError = true;
        console.error("Server Error", err);
      }
    });
  }
}
