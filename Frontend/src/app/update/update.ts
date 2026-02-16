import { Component } from '@angular/core';

@Component({
  selector: 'app-update',
  imports: [],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
  newEmployee: any;
  onSubmit() {
    console.log("Updated the Employee..");
  }

}
