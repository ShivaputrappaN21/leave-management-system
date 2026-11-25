import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { NavbarComponent } from './components/navbar.component';
import { StatusBadgeComponent } from './components/status-badge.component';
import { DashboardComponent } from './pages/dashboard.component';
import { DepartmentsComponent } from './pages/departments.component';
import { EmployeeDetailComponent } from './pages/employee-detail.component';
import { EmployeeFormComponent } from './pages/employee-form.component';
import { EmployeeListComponent } from './pages/employee-list.component';
import { LeaveBalancesComponent } from './pages/leave-balances.component';
import { LeaveRequestFormComponent } from './pages/leave-request-form.component';
import { LeaveRequestListComponent } from './pages/leave-request-list.component';
import { LeaveTypesComponent } from './pages/leave-types.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, StatusBadgeComponent, ConfirmDialogComponent,
    DashboardComponent, EmployeeListComponent, EmployeeFormComponent, EmployeeDetailComponent,
    DepartmentsComponent, LeaveTypesComponent, LeaveBalancesComponent,
    LeaveRequestListComponent, LeaveRequestFormComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
