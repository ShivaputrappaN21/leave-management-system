import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Employee } from '../models/models';
import { errMsg } from '../services/crud.service';
import { DepartmentService } from '../services/department.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  template: `
  <h3 class="mb-3">{{ empNo ? 'Edit Employee ' + empNo : 'Add Employee' }}</h3>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="card shadow-sm" style="max-width:760px"><div class="card-body">
  <form [formGroup]="form" (ngSubmit)="save()" novalidate>
    <div class="row g-3">
      <div class="col-md-8">
        <label class="form-label">Name</label>
        <input class="form-control" formControlName="name" [class.is-invalid]="bad('name')">
        <div class="invalid-feedback">Name is required (max 60 characters).</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Age</label>
        <input type="number" class="form-control" formControlName="age" [class.is-invalid]="bad('age')">
        <div class="invalid-feedback">Age must be between 18 and 58.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Gender</label>
        <select class="form-select" formControlName="gender" [class.is-invalid]="bad('gender')">
          <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
        </select>
        <div class="invalid-feedback">Gender is required.</div>
      </div>
      <div class="col-md-8">
        <label class="form-label">Email</label>
        <input class="form-control" formControlName="email" [class.is-invalid]="bad('email')">
        <div class="invalid-feedback">Enter a valid email address.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Salary (Rs.)</label>
        <input type="number" class="form-control" formControlName="salary" [class.is-invalid]="bad('salary')">
        <div class="invalid-feedback">Salary must be greater than 0.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Department</label>
        <select class="form-select" formControlName="deptId" [class.is-invalid]="bad('deptId')">
          <option [ngValue]="null">Select</option>
          <option *ngFor="let d of departments" [ngValue]="d.deptId">{{ d.deptName }}</option>
        </select>
        <div class="invalid-feedback">Department is required.</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Join date</label>
        <input type="date" class="form-control" formControlName="joinDate" [class.is-invalid]="bad('joinDate')">
        <div class="invalid-feedback">Join date is required.</div>
      </div>
      <div class="col-md-4" *ngIf="empNo">
        <label class="form-label">Status</label>
        <select class="form-select" formControlName="status"><option>ACTIVE</option><option>INACTIVE</option></select>
      </div>
    </div>
    <div class="mt-4">
      <button class="btn btn-primary me-2" type="submit" [disabled]="saving">{{ empNo ? 'Update Employee' : 'Save Employee' }}</button>
      <a class="btn btn-secondary" routerLink="/employees">Back</a>
    </div>
  </form></div></div>`
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  departments: Department[] = [];
  empNo: number | null = null;
  submitted = false;
  saving = false;
  error = '';

  constructor(private fb: FormBuilder, private service: EmployeeService, private deptService: DepartmentService,
              private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(58)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [null, [Validators.required, Validators.min(0.01)]],
      deptId: [null, Validators.required],
      joinDate: [new Date().toISOString().substring(0, 10), Validators.required],
      status: ['ACTIVE']
    });
  }

  ngOnInit(): void {
    this.deptService.getAll().subscribe({ next: d => this.departments = d, error: e => this.error = errMsg(e) });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empNo = +id;
      this.service.getById(this.empNo).subscribe({
        next: (e: Employee) => this.form.patchValue({ ...e, deptId: e.department.deptId }),
        error: err => this.error = errMsg(err)
      });
    }
  }

  bad(c: string): boolean {
    const x = this.form.get(c);
    return !!x && x.invalid && (x.touched || this.submitted);
  }

  save(): void {
    this.submitted = true; this.error = '';
    if (this.form.invalid) { return; }
    const v = this.form.value;
    const payload: Employee = {
      name: v.name, age: v.age, gender: v.gender, email: v.email, salary: v.salary,
      joinDate: v.joinDate, status: v.status || 'ACTIVE', department: { deptId: v.deptId }
    };
    this.saving = true;
    const call = this.empNo ? this.service.update(this.empNo, payload) : this.service.create(payload);
    call.subscribe({
      next: () => this.router.navigate(['/employees']),
      error: e => { this.error = errMsg(e); this.saving = false; }
    });
  }
}
