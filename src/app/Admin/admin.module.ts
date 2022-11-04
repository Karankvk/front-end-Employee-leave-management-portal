import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ManagerLeaveDetailsComponent } from './manager-leave-details/manager-leave-details.component';
// import { ManagerTableComponent } from './manager-table/manager-table.component';
import { RolesComponent } from './roles/roles.component';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { NgChartsModule } from 'ng2-charts';
import { NgChartjsModule } from 'ng-chartjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExcelDataComponent } from './excel-data/excel-data.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    EmployeeDetailsComponent,
    ManagerLeaveDetailsComponent,
    ExcelDataComponent,
    // ManagerTableComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    NgChartsModule,
    NgChartjsModule,
    NgChartjsModule.registerPlugin([]),
    FlexLayoutModule,
    TextMaskModule,
  ],
  exports: [RouterModule],
})
export class AdminModule {}
