import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardSummary } from '../models/models';
import { API_URL } from './crud.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}
  summary(): Observable<DashboardSummary> { return this.http.get<DashboardSummary>(`${API_URL}/dashboard`); }
}
