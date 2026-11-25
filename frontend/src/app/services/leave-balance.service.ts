import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaveBalance } from '../models/models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class LeaveBalanceService extends CrudService<LeaveBalance> {
  constructor(http: HttpClient) { super(http, 'leave-balances'); }

  byEmployee(empNo: number): Observable<LeaveBalance[]> {
    return this.getAll().pipe(map(list => list.filter(b => b.employee.empNo === empNo)));
  }
}
