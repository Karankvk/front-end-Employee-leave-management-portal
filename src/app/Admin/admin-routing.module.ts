import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ExcelDataComponent } from './excel-data/excel-data.component';
import { ManagerLeaveDetailsComponent } from './manager-leave-details/manager-leave-details.component';
// import { ManagerTableComponent } from './manager-table/manager-table.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'adminDashboard', pathMatch: 'full' },
      { path: 'adminDashboard', component: AdminDashboardComponent },
      // { path: 'managerDetails', component: ManagerTableComponent },
      { path: 'employeeDetails', component: EmployeeDetailsComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'managerLeaveDetails', component: ManagerLeaveDetailsComponent },
      { path: 'uploadExcel_exportPdf', component: ExcelDataComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
