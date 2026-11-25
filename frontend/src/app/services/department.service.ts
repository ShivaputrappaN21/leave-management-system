import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService extends CrudService<Department> {
  constructor(http: HttpClient) { super(http, 'departments'); }
}
