import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashBoardComponent } from './employee-dash-board/employee-dash-board.component';
import { EmployeeLeaveStatusComponent } from './employee-leave-status/employee-leave-status.component';
import { EmployeeUpdatePasswordComponent } from './employee-update-password/employee-update-password.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeDashBoardComponent,
    children: [
      { path: '', redirectTo: 'employeeDashboard', pathMatch: 'full' },
      { path: 'employeeDashboard', component: EmployeeDashBoardComponent },
      { path: 'employeeLeaveStatus', component: EmployeeLeaveStatusComponent },
      { path: 'updatePassword', component: EmployeeUpdatePasswordComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
