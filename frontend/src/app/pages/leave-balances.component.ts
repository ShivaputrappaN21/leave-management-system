import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, LeaveBalance, LeaveType } from '../models/models';
import { errMsg } from '../services/crud.service';
import { EmployeeService } from '../services/employee.service';
import { LeaveBalanceService } from '../services/leave-balance.service';
import { LeaveTypeService } from '../services/leave-type.service';

@Component({
  selector: 'app-leave-balances',
  standalone: false,
  template: `
  <h3 class="mb-3">Leave Balances</h3>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="alert alert-success" *ngIf="message">{{ message }}</div>
  <div class="card shadow-sm mb-4"><div class="card-body">
    <h6>{{ editId ? 'Edit allotted days' : 'Allot leave balance' }}</h6>
    <form [formGroup]="form" (ngSubmit)="save()" class="row g-2" novalidate>
      <div class="col-md-3"><select class="form-select" formControlName="empNo" [class.is-invalid]="bad('empNo')">
        <option [ngValue]="null">Employee</option><option *ngFor="let e of employees" [ngValue]="e.empNo">{{ e.empNo }} - {{ e.name }}</option></select></div>
      <div class="col-md-3"><select class="form-select" formControlName="leaveTypeId" [class.is-invalid]="bad('leaveTypeId')">
        <option [ngValue]="null">Leave type</option><option *ngFor="let t of types" [ngValue]="t.leaveTypeId">{{ t.typeName }}</option></select></div>
      <div class="col-md-2"><input type="number" class="form-control" placeholder="Year" formControlName="year" [class.is-invalid]="bad('year')"></div>
      <div class="col-md-2"><input type="number" class="form-control" placeholder="Allotted days" formControlName="allottedDays" [class.is-invalid]="bad('allottedDays')"></div>
      <div class="col-md-2"><button class="btn btn-primary me-1" type="submit">{{ editId ? 'Update' : 'Add' }}</button>
        <button class="btn btn-secondary" type="button" *ngIf="editId" (click)="reset()">Cancel</button></div>
      <div class="text-danger small" *ngIf="submitted && form.invalid">All fields are required (year 2000-2100, days 0 or more).</div>
    </form>
  </div></div>
  <div class="card shadow-sm"><table class="table table-hover mb-0">
    <thead><tr><th>ID</th><th>Employee</th><th>Leave type</th><th>Year</th><th>Allotted</th><th>Used</th><th>Remaining</th><th>Actions</th></tr></thead>
    <tbody>
      <tr *ngFor="let b of list">
        <td>{{ b.balanceId }}</td><td>{{ b.employee.empNo }} - {{ b.employee.name }}</td><td>{{ b.leaveType.typeName }}</td>
        <td>{{ b.year }}</td><td>{{ b.allottedDays }}</td><td>{{ b.usedDays }}</td><td>{{ b.allottedDays - b.usedDays }}</td>
        <td><button class="btn btn-sm btn-outline-secondary me-1" (click)="edit(b)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" (click)="toDelete=b">Delete</button></td>
      </tr>
    </tbody>
  </table></div>
  <app-confirm-dialog [show]="!!toDelete" title="Delete balance" yesText="Delete" noText="Cancel"
     message="Delete this leave balance row?" (confirmed)="doDelete()" (cancelled)="toDelete=null"></app-confirm-dialog>`
})
export class LeaveBalancesComponent implements OnInit {
  list: LeaveBalance[] = [];
  employees: Employee[] = [];
  types: LeaveType[] = [];
  form: FormGroup;
  editId: number | null = null;
  submitted = false;
  error = ''; message = '';
  toDelete: LeaveBalance | null = null;

  constructor(private fb: FormBuilder, private service: LeaveBalanceService,
              private empService: EmployeeService, private typeService: LeaveTypeService) {
    this.form = this.fb.group({
      empNo: [null, Validators.required],
      leaveTypeId: [null, Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      allottedDays: [null, [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {
    this.load();
    this.empService.getAll().subscribe(e => this.employees = e);
    this.typeService.getAll().subscribe(t => this.types = t);
  }
  load(): void { this.service.getAll().subscribe({ next: l => this.list = l, error: e => this.error = errMsg(e) }); }
  bad(c: string): boolean { const x = this.form.get(c); return !!x && x.invalid && this.submitted; }

  edit(b: LeaveBalance): void {
    this.editId = b.balanceId!; this.message = ''; this.error = '';
    this.form.patchValue({ empNo: b.employee.empNo, leaveTypeId: b.leaveType.leaveTypeId, year: b.year, allottedDays: b.allottedDays });
    ['empNo', 'leaveTypeId', 'year'].forEach(c => this.form.get(c)!.disable());
  }
  reset(): void {
    this.editId = null; this.submitted = false;
    ['empNo', 'leaveTypeId', 'year'].forEach(c => this.form.get(c)!.enable());
    this.form.reset({ empNo: null, leaveTypeId: null, year: new Date().getFullYear(), allottedDays: null });
  }

  save(): void {
    this.submitted = true; this.error = ''; this.message = '';
    if (this.form.invalid) { return; }
    const v = this.form.getRawValue();
    const payload: LeaveBalance = {
      employee: { empNo: v.empNo }, leaveType: { leaveTypeId: v.leaveTypeId }, year: v.year, allottedDays: v.allottedDays
    };
    const call = this.editId ? this.service.update(this.editId, payload) : this.service.create(payload);
    call.subscribe({
      next: () => { this.message = this.editId ? 'Balance updated' : 'Balance saved'; this.reset(); this.load(); },
      error: e => this.error = errMsg(e)
    });
  }
  doDelete(): void {
    const id = this.toDelete!.balanceId!; this.toDelete = null;
    this.service.delete(id).subscribe({ next: r => { this.message = r.message; this.load(); }, error: e => this.error = errMsg(e) });
  }
}
