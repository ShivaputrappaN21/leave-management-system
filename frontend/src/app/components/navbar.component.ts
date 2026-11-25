import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  template: `
  <nav class="sidebar p-3">
    <h4 class="text-white mb-0">ELMS</h4>
    <div class="small mb-4" style="color:#aab4dc">Leave Management</div>
    <a *ngFor="let l of links" [routerLink]="l.path" routerLinkActive="active">{{ l.label }}</a>
  </nav>`
})
export class NavbarComponent {
  links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/employees', label: 'Employees' },
    { path: '/departments', label: 'Departments' },
    { path: '/leave-types', label: 'Leave Types' },
    { path: '/leave-requests', label: 'Leave Requests' },
    { path: '/leave-balances', label: 'Leave Balances' }
  ];
}
