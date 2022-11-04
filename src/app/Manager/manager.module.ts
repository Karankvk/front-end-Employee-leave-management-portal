import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLeaveDetailsComponent } from './employee-leave-details/employee-leave-details.component';
import { ManagerDashBoardComponent } from './manager-dash-board/manager-dash-board.component';
import { ManagerEmployeeTableComponent } from './manager-employee-table/manager-employee-table.component';
import { DialogComponent, ManagerLeaveStatusComponent } from './manager-leave-status/manager-leave-status.component';
import { ManagerRoutingModule } from './manager-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
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


@NgModule({
  declarations: [
    ManagerDashBoardComponent,
    ManagerEmployeeTableComponent,
    EmployeeLeaveDetailsComponent,
    ManagerLeaveStatusComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    FlexLayoutModule,
    NgChartjsModule.registerPlugin([]),
  ]
})
export class ManagerModule { }
