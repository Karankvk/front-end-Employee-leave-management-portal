import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Leave } from '../../model/Leave';
import { NotificationService } from '../../Service/notification.service';
import { Employee } from '../../model/Employee';
import { EmployeeLeaveStatusService } from 'src/app/Employee/employee-leave-status/employee-leave-status.service';
import { ApplyLeaveService } from './apply-leave.service';
import { Location } from '@angular/common';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'Moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'Moment';


const Moment = _rollupMoment || moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'DD MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ApplyLeaveComponent implements OnInit {
  leave: Leave = new Leave();
  private formSubmitAttempt?: boolean;
  public Employee: Employee[] = [];
  public leaveCount: number = 0;
  public totalLeave: number = 12;
  public leaveLeft: number;
  view = true;

  minDate: any;
  minEndDate:any
  maxDate: any;
  public today = new Date();
  public currentYear = this.today.getFullYear();
  public currentMonth = this.today.getMonth();
  public currentDay = this.today.getDay();
  public currentDate = this.today.getDate();

  date = new FormControl(moment());

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private applyLeaveService: ApplyLeaveService,
    private notify: NotificationService,
    private employeeLeaveStatusService: EmployeeLeaveStatusService,
    private _location: Location
  ) {
    this.minDate = new Date(this.currentYear, this.currentMonth, this.currentDate);

    //Employee Detail
    this.applyLeaveService.getEmployeeDetail().subscribe((data) => {
      this.Employee = data;
      this.submitLeaveForm.value.employeeID = this.Employee[0].employeeId;
      this.leaveLeft = this.totalLeave - data[0].leaveCount;
    });
  }

  ngOnInit(): void {
    this.employeeLeaveStatusService
      .employeeSpecificLeave()
      .subscribe((data) => {});
  }

  submitLeaveForm = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    leaveType: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    employeeID: ['', [Validators.required]],
  });

  get startDate() {
    return this.submitLeaveForm.get('startDate');
  }
  get endDate() {
    return this.submitLeaveForm.get('endDate');
  }
  get leaveType() {
    return this.submitLeaveForm.get('leaveType');
  }
  get reason() {
    return this.submitLeaveForm.get('reason');
  }
  get employeeId() {
    return this.submitLeaveForm.get('employeeID');
  }

  saveManagerLeave() {
    console.log(this.submitLeaveForm.value );

    if (this.leaveCount < 12) {
      this.applyLeaveService.saveLeave(this.leave).subscribe(
        (data) => {this.router.navigate(['/layout/successfullyApplied'])},
        (error) => alert("Something went wronge.")
      );
      this.formSubmitAttempt = true;
      this.showToastrUpdated();
    } else {
      this.backClicked();
      this.showToastrError();
    }
  }

  showToastrUpdated() {
    this.notify.showSuccess('🤩 Leave submitted !!');
  }
  showToastrError() {
    this.notify.showWarning('😞 Unable to apply !!');
  }

  addEvent(event:any) {
   this.minEndDate = event.value;
   console.log(this.minEndDate)
   console.log(this.leaveLeft)
   this.maxDate = moment(this.minEndDate).add(this.leaveLeft-1, 'days')
   console.log(moment(this.minEndDate).format('DD MMMM YYYY'))
   console.log(moment(this.maxDate).format('DD MMMM YYYY'))
  }

  show(event: any) {
    if( event.value !== null){
      this.view = false;
    }
  }

  backClicked() {
    this._location.back();
  }
}

