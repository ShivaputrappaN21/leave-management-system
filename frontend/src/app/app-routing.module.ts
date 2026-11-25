import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { DepartmentsComponent } from './pages/departments.component';
import { EmployeeDetailComponent } from './pages/employee-detail.component';
import { EmployeeFormComponent } from './pages/employee-form.component';
import { EmployeeListComponent } from './pages/employee-list.component';
import { LeaveBalancesComponent } from './pages/leave-balances.component';
import { LeaveRequestFormComponent } from './pages/leave-request-form.component';
import { LeaveRequestListComponent } from './pages/leave-request-list.component';
import { LeaveTypesComponent } from './pages/leave-types.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'employees/:id/edit', component: EmployeeFormComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'leave-types', component: LeaveTypesComponent },
  { path: 'leave-requests', component: LeaveRequestListComponent },
  { path: 'leave-requests/new', component: LeaveRequestFormComponent },
  { path: 'leave-balances', component: LeaveBalancesComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
