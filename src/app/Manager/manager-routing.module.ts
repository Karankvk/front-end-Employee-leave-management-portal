import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLeaveDetailsComponent } from './employee-leave-details/employee-leave-details.component';
import { ManagerDashBoardComponent } from './manager-dash-board/manager-dash-board.component';
import { ManagerEmployeeTableComponent } from './manager-employee-table/manager-employee-table.component';
import { ManagerLeaveStatusComponent } from './manager-leave-status/manager-leave-status.component';

const routes: Routes = [
  {
    path: 'manager',
    component: ManagerDashBoardComponent,
    children: [
      { path: '', redirectTo: 'managerDashboard', pathMatch: 'full' },
      { path: 'managerDashboard', component: ManagerDashBoardComponent },
      { path: 'employeeTable', component: ManagerEmployeeTableComponent },
      { path: 'employeeLeaveDetails', component: EmployeeLeaveDetailsComponent },
      { path: 'managerLeaveStatus', component: ManagerLeaveStatusComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
