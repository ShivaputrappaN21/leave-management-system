import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class LeaveRequestService extends CrudService<LeaveRequest> {
  constructor(http: HttpClient) { super(http, 'leave-requests'); }

  byStatus(status: string): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.url, { params: status ? { status } : {} });
  }
  byEmployee(empNo: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.url, { params: { empNo } });
  }
  approve(id: number): Observable<LeaveRequest> { return this.http.put<LeaveRequest>(`${this.url}/${id}/approve`, {}); }
  reject(id: number): Observable<LeaveRequest> { return this.http.put<LeaveRequest>(`${this.url}/${id}/reject`, {}); }
  /** DELETE is a status based cancellation on the server. */
  cancel(id: number): Observable<any> { return this.delete(id); }
}
