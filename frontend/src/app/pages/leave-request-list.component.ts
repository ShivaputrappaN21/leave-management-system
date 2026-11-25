import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from '../models/models';
import { errMsg } from '../services/crud.service';
import { LeaveRequestService } from '../services/leave-request.service';

@Component({
  selector: 'app-leave-request-list',
  standalone: false,
  template: `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3 class="mb-0">Leave Requests</h3>
    <a class="btn btn-primary" routerLink="/leave-requests/new">+ Apply Leave</a>
  </div>
  <div class="mb-3" style="max-width:240px">
    <select class="form-select" [(ngModel)]="status" (change)="load()">
      <option value="">All statuses</option><option>PENDING</option><option>APPROVED</option><option>REJECTED</option><option>CANCELLED</option>
    </select>
  </div>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="alert alert-success" *ngIf="message">{{ message }}</div>
  <div class="card shadow-sm"><table class="table table-hover mb-0 align-middle">
    <thead><tr><th>Req ID</th><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
      <tr *ngFor="let r of list">
        <td>{{ r.requestId }}</td><td>{{ r.employee.name }}</td><td>{{ r.leaveType.typeName }}</td>
        <td>{{ r.fromDate | date:'dd-MM-yyyy' }}</td><td>{{ r.toDate | date:'dd-MM-yyyy' }}</td><td>{{ r.days }}</td>
        <td><app-status-badge [status]="r.status"></app-status-badge></td>
        <td>
          <ng-container *ngIf="r.status === 'PENDING'">
            <button class="btn btn-sm btn-success me-1" (click)="approve(r)">Approve</button>
            <button class="btn btn-sm btn-outline-danger me-1" (click)="ask(r, 'reject')">Reject</button>
          </ng-container>
          <button class="btn btn-sm btn-outline-secondary" *ngIf="r.status === 'PENDING' || r.status === 'APPROVED'" (click)="ask(r, 'cancel')">Cancel</button>
        </td>
      </tr>
      <tr *ngIf="!list.length"><td colspan="8" class="text-muted">No leave requests.</td></tr>
    </tbody>
  </table></div>
  <app-confirm-dialog [show]="!!target" [title]="action === 'cancel' ? 'Confirm cancellation' : 'Confirm rejection'"
     [yesText]="action === 'cancel' ? 'Yes, Cancel' : 'Yes, Reject'" noText="Keep"
     [message]="(action === 'cancel' ? 'Cancel' : 'Reject') + ' leave request ' + target?.requestId + ' for ' + target?.employee?.name + '? Leave days will be restored to the balance.'"
     (confirmed)="confirm()" (cancelled)="target=null"></app-confirm-dialog>`
})
export class LeaveRequestListComponent implements OnInit {
  list: LeaveRequest[] = [];
  status = '';
  error = ''; message = '';
  target: LeaveRequest | null = null;
  action: 'cancel' | 'reject' = 'cancel';
  constructor(private service: LeaveRequestService) {}

  ngOnInit(): void { this.load(); }
  load(): void { this.service.byStatus(this.status).subscribe({ next: l => this.list = l, error: e => this.error = errMsg(e) }); }

  approve(r: LeaveRequest): void {
    this.error = ''; this.message = '';
    this.service.approve(r.requestId!).subscribe({
      next: () => { this.message = 'Request ' + r.requestId + ' approved'; this.load(); },
      error: e => this.error = errMsg(e)
    });
  }
  ask(r: LeaveRequest, a: 'cancel' | 'reject'): void { this.target = r; this.action = a; this.error = ''; this.message = ''; }

  confirm(): void {
    const id = this.target!.requestId!; this.target = null;
    const call = this.action === 'cancel' ? this.service.cancel(id) : this.service.reject(id);
    call.subscribe({
      next: (r: any) => { this.message = r.message || ('Request ' + id + ' rejected'); this.load(); },
      error: e => this.error = errMsg(e)
    });
  }
}
