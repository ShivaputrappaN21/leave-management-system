import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends CrudService<Employee> {
  constructor(http: HttpClient) { super(http, 'employees'); }

  search(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/search`, { params: { name } });
  }
}
