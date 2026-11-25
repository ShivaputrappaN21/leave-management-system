import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL = 'http://localhost:8080/api';

/** Generic typed CRUD service: GET, POST, PUT, DELETE through HttpClient. */
export abstract class CrudService<T> {
  constructor(protected http: HttpClient, protected resource: string) {}

  protected get url(): string { return `${API_URL}/${this.resource}`; }

  getAll(): Observable<T[]> { return this.http.get<T[]>(this.url); }
  getById(id: number): Observable<T> { return this.http.get<T>(`${this.url}/${id}`); }
  create(item: T): Observable<T> { return this.http.post<T>(this.url, item); }
  update(id: number, item: T): Observable<any> { return this.http.put<any>(`${this.url}/${id}`, item); }
  delete(id: number): Observable<any> { return this.http.delete<any>(`${this.url}/${id}`); }
}

/** Extracts the JSON error message returned by Spring Boot. */
export function errMsg(e: any): string {
  if (e && e.status === 0) { return 'Cannot reach the backend on http://localhost:8080'; }
  return (e && e.error && e.error.message) ? e.error.message : 'Request failed';
}
