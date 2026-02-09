import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private router = inject(Router);
  features = [
    { title: 'Search', desc: 'Find any employee instantly using name or ID.', icon: '🔍', path: '/search' },
    { title: 'Update', desc: 'Modify employee profiles and designations with ease.', icon: '✏️', path: '/update' },
    { title: 'Add', desc: 'Onboard new team members into the system securely.', icon: '➕', path: '/add' },
    { title: 'Delete', desc: 'Remove offboarded employee records permanently.', icon: '🗑️', path: '/delete' }
  ];
  onFeatureClick(title: string) {
    if (title === 'Update') {
      this.router.navigate(['/update']); // Make sure '/update' matches your route path
    }
  }
}
