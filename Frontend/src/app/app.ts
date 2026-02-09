import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employs } from "./employs/employs";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: `./app.html`
})
export class App {

}