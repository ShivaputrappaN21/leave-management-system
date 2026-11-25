import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: false,
  template: `<span class="badge rounded-pill" [ngClass]="cls">{{ status }}</span>`
})
export class StatusBadgeComponent {
  @Input() status = '';
  get cls(): string {
    switch (this.status) {
      case 'APPROVED': case 'ACTIVE': return 'text-bg-success';
      case 'PENDING': return 'text-bg-warning';
      case 'REJECTED': return 'text-bg-danger';
      default: return 'text-bg-secondary';
    }
  }
}
