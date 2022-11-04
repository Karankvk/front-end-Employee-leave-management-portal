import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './Admin/employee-details/employee-details.component';
import { EmployeeDashBoardComponent } from './Employee/employee-dash-board/employee-dash-board.component';
import { EmployeeLeaveStatusComponent } from './Employee/employee-leave-status/employee-leave-status.component';
import { ManagerLeaveDetailsComponent } from './Admin/manager-leave-details/manager-leave-details.component';
import { LoginComponent } from './Common/login/login.component';
import { LogoutComponent } from './Common/logout/logout.component';
import { ManagerDashBoardComponent } from './Manager/manager-dash-board/manager-dash-board.component';
import { ManagerEmployeeTableComponent } from './Manager/manager-employee-table/manager-employee-table.component';
import { ManagerLeaveStatusComponent } from './Manager/manager-leave-status/manager-leave-status.component';
import { EmployeeLeaveDetailsComponent } from './Manager/employee-leave-details/employee-leave-details.component';
import { NoPageFoundComponent } from './Common/no-page-found/no-page-found.component';
import { RolesComponent } from './Admin/roles/roles.component';
import { SideNavBarComponent } from './Common/side-nav-bar/side-nav-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { EmployeeUpdatePasswordComponent } from './Employee/employee-update-password/employee-update-password.component';
import { ApplyLeaveComponent } from './Common/apply-leave/apply-leave.component';
import { SuccessfullySubmittedComponent } from './Common/successfully-submitted/successfully-submitted.component';
import { ExcelDataComponent } from './Admin/excel-data/excel-data.component';
import { UploadFileComponent } from './Common/upload-file/upload-file.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sideNavBar', component: SideNavBarComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'layout',
    component: LayoutComponent,

    children: [
      // For admin
      { path: 'adminDashboard', component: AdminDashboardComponent },
      { path: 'employeeDetails', component: EmployeeDetailsComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'managerLeaveDetails', component: ManagerLeaveDetailsComponent },
      { path: 'uploadExcel_exportPdf', component: ExcelDataComponent },
      // For Manager
      { path: 'managerDashboard', component: ManagerDashBoardComponent },
      { path: 'employeeTable', component: ManagerEmployeeTableComponent },
      {
        path: 'employeeLeaveDetails',
        component: EmployeeLeaveDetailsComponent,
      },
      { path: 'managerLeaveStatus', component: ManagerLeaveStatusComponent },
      // For Employee
      { path: 'employeeDashboard', component: EmployeeDashBoardComponent },
      { path: 'employeeLeaveStatus', component: EmployeeLeaveStatusComponent },
      { path: 'updatePassword', component: EmployeeUpdatePasswordComponent },
      //Common fro manager and employee
      { path: 'applyLeave', component: ApplyLeaveComponent },
      { path: 'successfullyApplied', component: SuccessfullySubmittedComponent },
      // Commom for all
      { path: 'fileManagement', component: UploadFileComponent },
    ],
  },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
