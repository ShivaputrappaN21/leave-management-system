import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/models';
import { errMsg } from '../services/crud.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  template: `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3 class="mb-0">Employees</h3>
    <div>
      <button class="btn btn-success me-2" (click)="exportCsv()" [disabled]="!employees.length">Export CSV</button>
      <a class="btn btn-primary" routerLink="/employees/new">+ Add Employee</a>
    </div>
  </div>
  <div class="input-group mb-3" style="max-width:480px">
    <input class="form-control" placeholder="Search by name" [(ngModel)]="term" (keyup.enter)="load()">
    <button class="btn btn-outline-primary" (click)="load()">Search</button>
    <button class="btn btn-outline-secondary" (click)="term=''; load()">Clear</button>
  </div>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="alert alert-success" *ngIf="message">{{ message }}</div>
  <div class="text-muted" *ngIf="loading">Loading...</div>
  <div class="card shadow-sm"><table class="table table-hover mb-0 align-middle">
    <thead><tr><th>Emp No</th><th>Name</th><th>Age</th><th>Gender</th><th>Department</th><th>Salary (Rs.)</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
      <tr *ngFor="let e of employees">
        <td>{{ e.empNo }}</td><td>{{ e.name }}</td><td>{{ e.age }}</td><td>{{ e.gender }}</td>
        <td>{{ e.department?.deptName }}</td><td>{{ e.salary | number:'1.2-2' }}</td>
        <td><app-status-badge [status]="e.status"></app-status-badge></td>
        <td>
          <a class="btn btn-sm btn-outline-primary me-1" [routerLink]="['/employees', e.empNo]">View</a>
          <a class="btn btn-sm btn-outline-secondary me-1" [routerLink]="['/employees', e.empNo, 'edit']">Edit</a>
          <button class="btn btn-sm btn-outline-danger" (click)="askDelete(e)">Delete</button>
        </td>
      </tr>
      <tr *ngIf="!loading && !employees.length"><td colspan="8" class="text-muted">No employees found.</td></tr>
    </tbody>
  </table></div>
  <div class="small text-muted mt-2">Showing {{ employees.length }} employee(s)</div>
  <app-confirm-dialog [show]="!!toDelete" title="Delete employee" yesText="Delete" noText="Cancel"
     [message]="'Delete ' + toDelete?.name + ' (' + toDelete?.empNo + ')?'"
     (confirmed)="doDelete()" (cancelled)="toDelete=null"></app-confirm-dialog>`
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  term = '';
  loading = false;
  error = '';
  message = '';
  toDelete: Employee | null = null;
  constructor(private service: EmployeeService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true; this.error = '';
    const call = this.term.trim() ? this.service.search(this.term.trim()) : this.service.getAll();
    call.subscribe({
      next: list => { this.employees = list; this.loading = false; },
      error: e => { this.error = errMsg(e); this.loading = false; }
    });
  }

  askDelete(e: Employee): void { this.toDelete = e; this.message = ''; this.error = ''; }

  doDelete(): void {
    const id = this.toDelete!.empNo!;
    this.toDelete = null;
    this.service.delete(id).subscribe({
      next: r => { this.message = r.message; this.load(); },
      error: e => { this.error = errMsg(e); }
    });
  }

  exportCsv(): void {
    const rows = [['EmpNo', 'Name', 'Age', 'Gender', 'Email', 'Department', 'Salary', 'Status'],
      ...this.employees.map(e => [e.empNo, e.name, e.age, e.gender, e.email, e.department?.deptName, e.salary, e.status])];
    const csv = rows.map(r => r.map(v => `"${v ?? ''}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'employees.csv';
    a.click();
  }
}
