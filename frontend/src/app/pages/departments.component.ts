import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../models/models';
import { errMsg } from '../services/crud.service';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-departments',
  standalone: false,
  template: `
  <h3 class="mb-3">Departments</h3>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="alert alert-success" *ngIf="message">{{ message }}</div>
  <div class="card shadow-sm mb-4"><div class="card-body">
    <h6>{{ editId ? 'Edit department ' + editId : 'Add department' }}</h6>
    <form [formGroup]="form" (ngSubmit)="save()" class="row g-2" novalidate>
      <div class="col-md-2"><input class="form-control" placeholder="Code" formControlName="deptCode" [class.is-invalid]="bad('deptCode')"></div>
      <div class="col-md-3"><input class="form-control" placeholder="Name" formControlName="deptName" [class.is-invalid]="bad('deptName')"></div>
      <div class="col-md-3"><input class="form-control" placeholder="Location" formControlName="location"></div>
      <div class="col-md-2"><input class="form-control" placeholder="Head" formControlName="headName"></div>
      <div class="col-md-2"><button class="btn btn-primary me-1" type="submit">{{ editId ? 'Update' : 'Add' }}</button>
        <button class="btn btn-secondary" type="button" *ngIf="editId" (click)="reset()">Cancel</button></div>
      <div class="text-danger small" *ngIf="submitted && form.invalid">Code (max 10) and name (max 60) are required.</div>
    </form>
  </div></div>
  <input class="form-control mb-2" style="max-width:320px" placeholder="Search departments" [(ngModel)]="term">
  <div class="card shadow-sm"><table class="table table-hover mb-0">
    <thead><tr><th>ID</th><th>Code</th><th>Name</th><th>Location</th><th>Head</th><th>Actions</th></tr></thead>
    <tbody>
      <tr *ngFor="let d of filtered()">
        <td>{{ d.deptId }}</td><td>{{ d.deptCode }}</td><td>{{ d.deptName }}</td><td>{{ d.location }}</td><td>{{ d.headName }}</td>
        <td><button class="btn btn-sm btn-outline-secondary me-1" (click)="edit(d)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" (click)="toDelete=d">Delete</button></td>
      </tr>
    </tbody>
  </table></div>
  <app-confirm-dialog [show]="!!toDelete" title="Delete department" yesText="Delete" noText="Cancel"
     [message]="'Delete department ' + toDelete?.deptName + '?'" (confirmed)="doDelete()" (cancelled)="toDelete=null"></app-confirm-dialog>`
})
export class DepartmentsComponent implements OnInit {
  list: Department[] = [];
  form: FormGroup;
  editId: number | null = null;
  term = '';
  submitted = false;
  error = ''; message = '';
  toDelete: Department | null = null;

  constructor(private fb: FormBuilder, private service: DepartmentService) {
    this.form = this.fb.group({
      deptCode: ['', [Validators.required, Validators.maxLength(10)]],
      deptName: ['', [Validators.required, Validators.maxLength(60)]],
      location: [''], headName: ['']
    });
  }
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe({ next: l => this.list = l, error: e => this.error = errMsg(e) }); }
  filtered(): Department[] {
    const t = this.term.toLowerCase();
    return this.list.filter(d => (d.deptName + d.deptCode).toLowerCase().includes(t));
  }
  bad(c: string): boolean { const x = this.form.get(c); return !!x && x.invalid && this.submitted; }
  edit(d: Department): void { this.editId = d.deptId!; this.form.patchValue(d); this.message = ''; this.error = ''; }
  reset(): void { this.editId = null; this.submitted = false; this.form.reset({ deptCode: '', deptName: '', location: '', headName: '' }); }

  save(): void {
    this.submitted = true; this.error = ''; this.message = '';
    if (this.form.invalid) { return; }
    const call = this.editId ? this.service.update(this.editId, this.form.value) : this.service.create(this.form.value);
    call.subscribe({
      next: () => { this.message = this.editId ? 'Department updated' : 'Department saved'; this.reset(); this.load(); },
      error: e => this.error = errMsg(e)
    });
  }

  doDelete(): void {
    const id = this.toDelete!.deptId!; this.toDelete = null;
    this.service.delete(id).subscribe({ next: r => { this.message = r.message; this.load(); }, error: e => this.error = errMsg(e) });
  }
}
