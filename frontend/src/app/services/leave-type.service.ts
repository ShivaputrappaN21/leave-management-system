import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveType } from '../models/models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class LeaveTypeService extends CrudService<LeaveType> {
  constructor(http: HttpClient) { super(http, 'leave-types'); }
}
