import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/Service/notification.service';
// import { EmployeeLeaveDetailsService } from '../employee-leave-details/employee-leave-details.service';
import { Leave } from '../../model/Leave';
import { EmployeeLeaveStatusService } from './employee-leave-status.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'Moment';
import { Employee } from 'src/app/model/Employee';

@Component({
  selector: 'app-employee-leave-status',
  templateUrl: './employee-leave-status.component.html',
  styleUrls: ['./employee-leave-status.component.css'],
})
export class EmployeeLeaveStatusComponent implements OnInit {
  employeeLeaves?: Leave[];
  public leaveCount: number = 0;
  public totalLeave: number = 12;
  leave: Leave = new Leave();
  private formUpdateAttempt: boolean = false;
  closeResult = '';
  leaveLeft: number;

  view = true;
  minDate: any;
  minEndDate:any
  maxDate: any;
  public today = new Date();
  public currentYear = this.today.getFullYear();
  public currentMonth = this.today.getMonth();
  public currentDay = this.today.getDay();
  public currentDate = this.today.getDate();

  constructor(
    private employeeLeaveStatusService: EmployeeLeaveStatusService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {
    this.minDate = new Date(this.currentYear, this.currentMonth, this.currentDate);
  }

  ngOnInit(): void {
    this.employeeLeave();
  }

  employeeLeave() {
    this.employeeLeaveStatusService
      .employeeSpecificLeave()
      .subscribe((data) => {
        this.employeeLeaves = data;
        this.leaveCount = this.employeeLeaves.length;
      });
  }

  // Revoke Leave
  revokeLeaveform = this.formBuilder.group({
    leaveId: ['', [Validators.required]],
  });

  get LeaveID() {
    return this.revokeLeaveform.get('leaveId');
  }

  RevokeLeave() {
    this.employeeLeaveStatusService.revokeLeave(this.leave).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => alert('Something went wronge')
    );
    this.formUpdateAttempt = true;
  }

  //Update Leave Form
  updateLeaveForm = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    leaveType: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    leaveId: ['', [Validators.required]],
  });

  get startDate() {
    return this.updateLeaveForm.get('startDate');
  }
  get endDate() {
    return this.updateLeaveForm.get('endDate');
  }
  get leaveType() {
    return this.updateLeaveForm.get('leaveType');
  }
  get reason() {
    return this.updateLeaveForm.get('reason');
  }
  get leaveId() {
    return this.updateLeaveForm.get('leaveId');
  }

  updateLeave() {
    this.employeeLeaveStatusService.updateLeave(this.leave).subscribe(
      (data) => {},
      (error) => this.ngOnInit()
    );
    this.formUpdateAttempt = true;
  }

  // Toastr
  showToastrUpdated() {
    this.notify.showSuccess('Leave revoked successfully !! 🎐🎉');
  }
  showToastrEdit() {
    this.notify.showInfo('Edited successfully !! 👌🏾');
  }

  // Auto fill
  rowItems(leave: any) {
    this.leave = leave;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
  addEvent(event:any) {
    console.log(event.value);
    this.minEndDate = event.value;
    this.maxDate = moment(event.value.getTime()+((this.leaveLeft - 1)*24*60*60*1000)).format('YYYY-MM-DD');
  }
  show() {
    console.log(this.view);

    this.view = false;
  }
  openDialog() {
    this.dialog.open(DialogComponent);
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  employeeLeaves: Leave[];
  public Employee: Employee[];
  public leaveCount: number = 0;
  public totalLeave: number = 12;
  leave: Leave = new Leave();
  private formUpdateAttempt: boolean = false;
  closeResult = '';
  leaveLeft: number;

  view = true;
  minDate: any;
  minEndDate: any;
  maxDate: any;
  public today = new Date();
  public currentYear = this.today.getFullYear();
  public currentMonth = this.today.getMonth();
  public currentDay = this.today.getDay();
  public currentDate = this.today.getDate();
  constructor(
    private employeeLeaveStatus: EmployeeLeaveStatusService,
    private employeeLeaveStatusService: EmployeeLeaveStatusService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {
    this.minDate = new Date(
      this.currentYear,
      this.currentMonth,
      this.currentDate
    );

    this.employeeDetails();
  }

  ngOnInit(): void {
    this.employeeLeave();
  }

  //Employee Detail
  employeeDetails() {
    this.employeeLeaveStatusService.getEmployeeDetail().subscribe((data) => {
      this.Employee = data;
      this.leaveLeft = this.totalLeave - data[0].leaveCount;
    });
  }


  employeeLeave() {
    this.employeeLeaveStatusService
      .employeeSpecificLeave()
      .subscribe((data) => {
        this.employeeLeaves = data;
        this.leaveCount = this.employeeLeaves.length;
    });
  }
  //Update Leave Form
  updateLeaveForm = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    leaveType: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    leaveId: ['', [Validators.required]],
  });

  get startDate() {
    return this.updateLeaveForm.get('startDate');
  }
  get endDate() {
    return this.updateLeaveForm.get('endDate');
  }
  get leaveType() {
    return this.updateLeaveForm.get('leaveType');
  }
  get reason() {
    return this.updateLeaveForm.get('reason');
  }
  get leaveId() {
    return this.updateLeaveForm.get('leaveId');
  }

  updateLeave() {
    this.employeeLeaveStatus.updateLeave(this.leave).subscribe(
      (data) => {this.ngOnInit()},
      (error) => alert("Something went wrong!")
    );
    this.formUpdateAttempt = true;
  }
   // Toastr
   showToastrUpdated() {
    this.notify.showSuccess('Leave revoked successfully !! 🎐🎉');
  }
  showToastrEdit() {
    this.notify.showInfo('Edited successfully !! 👌🏾');
  }

  // Auto fill
  rowItems(leave: any) {
    this.leave = leave;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  addEvent(event:any) {
    console.log(event.value);
    this.minEndDate = event.value;
    this.maxDate = moment(event.value.getTime()+((this.leaveLeft - 1)*24*60*60*1000)).format('YYYY-MM-DD');
  }
  show(event: any) {
    if( event.value !== null){
      this.view = false;
    }
  }

}
