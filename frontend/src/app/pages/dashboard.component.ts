import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from '../models/models';
import { errMsg } from '../services/crud.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  template: `
  <h3 class="mb-4">Dashboard</h3>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="text-muted" *ngIf="loading">Loading...</div>
  <div *ngIf="data">
    <div class="row g-3 mb-4">
      <div class="col-md-3" *ngFor="let c of cards">
        <div class="card shadow-sm border-start border-4" [ngClass]="c.border"><div class="card-body">
          <div class="text-muted small">{{ c.label }}</div>
          <div class="display-5 fw-semibold">{{ data[c.key] }}</div>
        </div></div>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-lg-6"><div class="card shadow-sm">
        <div class="card-header fw-semibold">Approved leave days by department</div>
        <div class="card-body">
          <div *ngFor="let d of data.daysByDepartment" class="mb-2">
            <div class="d-flex justify-content-between small"><span>{{ d.department }}</span><span>{{ d.days }}</span></div>
            <div class="progress"><div class="progress-bar" [style.width.%]="pct(d.days)"></div></div>
          </div>
          <div class="text-muted" *ngIf="!data.daysByDepartment.length">No approved leave yet.</div>
        </div>
      </div></div>
      <div class="col-lg-6"><div class="card shadow-sm">
        <div class="card-header fw-semibold">Upcoming leaves</div>
        <table class="table table-sm mb-0">
          <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>Days</th><th>Status</th></tr></thead>
          <tbody>
            <tr *ngFor="let r of data.upcomingLeaves">
              <td>{{ r.employee.name }}</td><td>{{ r.leaveType.typeName }}</td>
              <td>{{ r.fromDate | date:'dd-MM-yyyy' }}</td><td>{{ r.days }}</td>
              <td><app-status-badge [status]="r.status"></app-status-badge></td>
            </tr>
            <tr *ngIf="!data.upcomingLeaves.length"><td colspan="5" class="text-muted">No upcoming leaves.</td></tr>
          </tbody>
        </table>
      </div></div>
    </div>
  </div>`
})
export class DashboardComponent implements OnInit {
  data: any = null;
  loading = true;
  error = '';
  cards = [
    { key: 'totalEmployees', label: 'Total Employees', border: 'border-primary' },
    { key: 'pendingRequests', label: 'Pending Requests', border: 'border-warning' },
    { key: 'approvedRequests', label: 'Approved Requests', border: 'border-success' },
    { key: 'onLeaveToday', label: 'On Leave Today', border: 'border-danger' }
  ];
  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.summary().subscribe({
      next: (d: DashboardSummary) => { this.data = d; this.loading = false; },
      error: e => { this.error = errMsg(e); this.loading = false; }
    });
  }

  pct(days: number): number {
    const max = Math.max(...this.data.daysByDepartment.map((x: any) => x.days), 1);
    return (days / max) * 100;
  }
}
