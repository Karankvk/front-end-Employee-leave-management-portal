import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashBoardComponent } from './employee-dash-board/employee-dash-board.component';
import { DialogComponent, EmployeeLeaveStatusComponent } from './employee-leave-status/employee-leave-status.component';
import { EmployeeRoutingModule } from './employee-routing.module';

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
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { EmployeeUpdatePasswordComponent } from './employee-update-password/employee-update-password.component';

@NgModule({
  declarations: [
    EmployeeDashBoardComponent,
    EmployeeLeaveStatusComponent,
    EmployeeUpdatePasswordComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    NgChartsModule,
    NgChartjsModule,
    NgChartjsModule.registerPlugin([]),
    FlexLayoutModule,
  ]
})
export class EmployeeModule { }
