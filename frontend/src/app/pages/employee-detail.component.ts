import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, LeaveBalance, LeaveRequest } from '../models/models';
import { errMsg } from '../services/crud.service';
import { EmployeeService } from '../services/employee.service';
import { LeaveBalanceService } from '../services/leave-balance.service';
import { LeaveRequestService } from '../services/leave-request.service';

@Component({
  selector: 'app-employee-detail',
  standalone: false,
  template: `
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div *ngIf="emp">
    <div class="d-flex justify-content-between mb-3">
      <h3>Employee Details - {{ emp.empNo }}</h3>
      <a class="btn btn-primary" [routerLink]="['/employees', emp.empNo, 'edit']">Edit</a>
    </div>
    <div class="card shadow-sm mb-3"><div class="card-body"><div class="row g-3">
      <div class="col-md-4"><div class="text-muted small">Name</div><b>{{ emp.name }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Age</div><b>{{ emp.age }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Gender</div><b>{{ emp.gender }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Department</div><b>{{ emp.department.deptName }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Email</div><b>{{ emp.email }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Salary</div><b>Rs. {{ emp.salary | number:'1.2-2' }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Joined</div><b>{{ emp.joinDate | date:'dd-MM-yyyy' }}</b></div>
      <div class="col-md-4"><div class="text-muted small">Status</div><app-status-badge [status]="emp.status"></app-status-badge></div>
    </div></div></div>
    <h5>Leave balances</h5>
    <div class="card shadow-sm mb-3"><table class="table mb-0">
      <thead><tr><th>Leave type</th><th>Year</th><th>Allotted</th><th>Used</th><th>Remaining</th></tr></thead>
      <tbody>
        <tr *ngFor="let b of balances"><td>{{ b.leaveType.typeName }}</td><td>{{ b.year }}</td><td>{{ b.allottedDays }}</td><td>{{ b.usedDays }}</td><td>{{ b.allottedDays - b.usedDays }}</td></tr>
        <tr *ngIf="!balances.length"><td colspan="5" class="text-muted">No balances allotted.</td></tr>
      </tbody>
    </table></div>
    <h5>Leave history</h5>
    <div class="card shadow-sm"><table class="table mb-0">
      <thead><tr><th>Req ID</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th></tr></thead>
      <tbody>
        <tr *ngFor="let r of requests"><td>{{ r.requestId }}</td><td>{{ r.leaveType.typeName }}</td><td>{{ r.fromDate | date:'dd-MM-yyyy' }}</td><td>{{ r.toDate | date:'dd-MM-yyyy' }}</td><td>{{ r.days }}</td><td><app-status-badge [status]="r.status"></app-status-badge></td></tr>
        <tr *ngIf="!requests.length"><td colspan="6" class="text-muted">No leave requests.</td></tr>
      </tbody>
    </table></div>
  </div>`
})
export class EmployeeDetailComponent implements OnInit {
  emp: Employee | null = null;
  balances: LeaveBalance[] = [];
  requests: LeaveRequest[] = [];
  error = '';
  constructor(private route: ActivatedRoute, private service: EmployeeService,
              private balanceService: LeaveBalanceService, private requestService: LeaveRequestService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({ next: e => this.emp = e, error: e => this.error = errMsg(e) });
    this.balanceService.byEmployee(id).subscribe(b => this.balances = b);
    this.requestService.byEmployee(id).subscribe(r => this.requests = r);
  }
}
