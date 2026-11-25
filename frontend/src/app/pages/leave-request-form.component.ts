import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, LeaveRequest, LeaveType } from '../models/models';
import { errMsg } from '../services/crud.service';
import { EmployeeService } from '../services/employee.service';
import { LeaveRequestService } from '../services/leave-request.service';
import { LeaveTypeService } from '../services/leave-type.service';

function dateOrder(g: AbstractControl): ValidationErrors | null {
  const f = g.get('fromDate')?.value, t = g.get('toDate')?.value;
  return f && t && t < f ? { dateOrder: true } : null;
}

@Component({
  selector: 'app-leave-request-form',
  standalone: false,
  template: `
  <h3 class="mb-3">Apply for Leave</h3>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="card shadow-sm" style="max-width:760px"><div class="card-body">
  <form [formGroup]="form" (ngSubmit)="save()" novalidate>
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Employee</label>
        <select class="form-select" formControlName="empNo" [class.is-invalid]="bad('empNo')">
          <option [ngValue]="null">Select</option>
          <option *ngFor="let e of employees" [ngValue]="e.empNo">{{ e.empNo }} - {{ e.name }}</option>
        </select>
        <div class="invalid-feedback">Employee is required.</div>
      </div>
      <div class="col-md-6">
        <label class="form-label">Leave type</label>
        <select class="form-select" formControlName="leaveTypeId" [class.is-invalid]="bad('leaveTypeId')">
          <option [ngValue]="null">Select</option>
          <option *ngFor="let t of types" [ngValue]="t.leaveTypeId">{{ t.typeName }}</option>
        </select>
        <div class="invalid-feedback">Leave type is required.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">From date</label>
        <input type="date" class="form-control" formControlName="fromDate" [class.is-invalid]="bad('fromDate')">
        <div class="invalid-feedback">From date is required.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">To date</label>
        <input type="date" class="form-control" formControlName="toDate" [class.is-invalid]="bad('toDate') || dateError()">
        <div class="invalid-feedback">To date is required and cannot be before from date.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Days (auto)</label>
        <input class="form-control" [value]="days()" disabled>
      </div>
      <div class="col-12">
        <label class="form-label">Reason</label>
        <input class="form-control" formControlName="reason" [class.is-invalid]="bad('reason')">
        <div class="invalid-feedback">Reason can have at most 200 characters.</div>
      </div>
    </div>
    <div class="mt-4">
      <button class="btn btn-primary me-2" type="submit" [disabled]="saving">Submit Request</button>
      <a class="btn btn-secondary" routerLink="/leave-requests">Cancel</a>
    </div>
  </form></div></div>`
})
export class LeaveRequestFormComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];
  types: LeaveType[] = [];
  submitted = false;
  saving = false;
  error = '';

  constructor(private fb: FormBuilder, private service: LeaveRequestService, private empService: EmployeeService,
              private typeService: LeaveTypeService, private router: Router) {
    this.form = this.fb.group({
      empNo: [null, Validators.required],
      leaveTypeId: [null, Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.maxLength(200)]
    }, { validators: dateOrder });
  }

  ngOnInit(): void {
    this.empService.getAll().subscribe(e => this.employees = e.filter(x => x.status === 'ACTIVE'));
    this.typeService.getAll().subscribe(t => this.types = t);
  }

  bad(c: string): boolean { const x = this.form.get(c); return !!x && x.invalid && (x.touched || this.submitted); }
  dateError(): boolean { return this.form.hasError('dateOrder') && (this.submitted || !!this.form.get('toDate')?.touched); }

  days(): number | string {
    const f = this.form.get('fromDate')!.value, t = this.form.get('toDate')!.value;
    if (!f || !t || t < f) { return ''; }
    return Math.round((new Date(t).getTime() - new Date(f).getTime()) / 86400000) + 1;
  }

  save(): void {
    this.submitted = true; this.error = '';
    if (this.form.invalid) { return; }
    const v = this.form.value;
    const payload: LeaveRequest = {
      employee: { empNo: v.empNo }, leaveType: { leaveTypeId: v.leaveTypeId },
      fromDate: v.fromDate, toDate: v.toDate, reason: v.reason
    };
    this.saving = true;
    this.service.create(payload).subscribe({
      next: () => this.router.navigate(['/leave-requests']),
      error: e => { this.error = errMsg(e); this.saving = false; }
    });
  }
}
