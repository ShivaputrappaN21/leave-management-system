import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveType } from '../models/models';
import { errMsg } from '../services/crud.service';
import { LeaveTypeService } from '../services/leave-type.service';

@Component({
  selector: 'app-leave-types',
  standalone: false,
  template: `
  <h3 class="mb-3">Leave Types</h3>
  <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
  <div class="alert alert-success" *ngIf="message">{{ message }}</div>
  <div class="card shadow-sm mb-4"><div class="card-body">
    <h6>{{ editId ? 'Edit leave type ' + editId : 'Add leave type' }}</h6>
    <form [formGroup]="form" (ngSubmit)="save()" class="row g-2 align-items-center" novalidate>
      <div class="col-md-2"><input class="form-control" placeholder="Code" formControlName="typeCode" [class.is-invalid]="bad('typeCode')"></div>
      <div class="col-md-3"><input class="form-control" placeholder="Name" formControlName="typeName" [class.is-invalid]="bad('typeName')"></div>
      <div class="col-md-2"><input type="number" class="form-control" placeholder="Max days" formControlName="maxDaysPerYear" [class.is-invalid]="bad('maxDaysPerYear')"></div>
      <div class="col-md-2"><div class="form-check"><input type="checkbox" class="form-check-input" id="paid" formControlName="paid"><label class="form-check-label" for="paid">Paid</label></div></div>
      <div class="col-md-3"><button class="btn btn-primary me-1" type="submit">{{ editId ? 'Update' : 'Add' }}</button>
        <button class="btn btn-secondary" type="button" *ngIf="editId" (click)="reset()">Cancel</button></div>
      <div class="text-danger small" *ngIf="submitted && form.invalid">Code, name and max days (1 to 365) are required.</div>
    </form>
  </div></div>
  <div class="card shadow-sm"><table class="table table-hover mb-0">
    <thead><tr><th>ID</th><th>Code</th><th>Name</th><th>Max days / year</th><th>Paid</th><th>Actions</th></tr></thead>
    <tbody>
      <tr *ngFor="let t of list">
        <td>{{ t.leaveTypeId }}</td><td>{{ t.typeCode }}</td><td>{{ t.typeName }}</td><td>{{ t.maxDaysPerYear }}</td><td>{{ t.paid ? 'Yes' : 'No' }}</td>
        <td><button class="btn btn-sm btn-outline-secondary me-1" (click)="edit(t)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" (click)="toDelete=t">Delete</button></td>
      </tr>
    </tbody>
  </table></div>
  <app-confirm-dialog [show]="!!toDelete" title="Delete leave type" yesText="Delete" noText="Cancel"
     [message]="'Delete leave type ' + toDelete?.typeName + '?'" (confirmed)="doDelete()" (cancelled)="toDelete=null"></app-confirm-dialog>`
})
export class LeaveTypesComponent implements OnInit {
  list: LeaveType[] = [];
  form: FormGroup;
  editId: number | null = null;
  submitted = false;
  error = ''; message = '';
  toDelete: LeaveType | null = null;

  constructor(private fb: FormBuilder, private service: LeaveTypeService) {
    this.form = this.fb.group({
      typeCode: ['', [Validators.required, Validators.maxLength(10)]],
      typeName: ['', [Validators.required, Validators.maxLength(50)]],
      maxDaysPerYear: [null, [Validators.required, Validators.min(1), Validators.max(365)]],
      paid: [true]
    });
  }
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe({ next: l => this.list = l, error: e => this.error = errMsg(e) }); }
  bad(c: string): boolean { const x = this.form.get(c); return !!x && x.invalid && this.submitted; }
  edit(t: LeaveType): void { this.editId = t.leaveTypeId!; this.form.patchValue(t); this.message = ''; this.error = ''; }
  reset(): void { this.editId = null; this.submitted = false; this.form.reset({ typeCode: '', typeName: '', maxDaysPerYear: null, paid: true }); }

  save(): void {
    this.submitted = true; this.error = ''; this.message = '';
    if (this.form.invalid) { return; }
    const call = this.editId ? this.service.update(this.editId, this.form.value) : this.service.create(this.form.value);
    call.subscribe({
      next: () => { this.message = this.editId ? 'Leave type updated' : 'Leave type saved'; this.reset(); this.load(); },
      error: e => this.error = errMsg(e)
    });
  }
  doDelete(): void {
    const id = this.toDelete!.leaveTypeId!; this.toDelete = null;
    this.service.delete(id).subscribe({ next: r => { this.message = r.message; this.load(); }, error: e => this.error = errMsg(e) });
  }
}
