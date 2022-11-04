import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/Service/notification.service';
import { EmployeeLeaveStatusService } from '../../Employee/employee-leave-status/employee-leave-status.service';
import { Leave } from '../../model/Leave';
import { ManagerLeaveStatusService } from './manager-leave-status.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'Moment';
import { Employee } from 'src/app/model/Employee';



@Component({
  selector: 'app-manager-leave-status',
  templateUrl: './manager-leave-status.component.html',
  styleUrls: ['./manager-leave-status.component.css'],
})
export class ManagerLeaveStatusComponent implements OnInit {
  managerLeaves: Leave[];
  public Employee: Employee[];
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
    private employeeLeaveStatus: EmployeeLeaveStatusService,
    private managerLeaveStatusService: ManagerLeaveStatusService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {
    this.minDate = new Date(this.currentYear, this.currentMonth, this.currentDate);
    this.employeeDetails();
  }

  ngOnInit(): void {
    this.employeeLeaves();
  }

  //Employee Detail
  employeeDetails() {
    this.managerLeaveStatusService.getEmployeeDetail().subscribe((data) => {
      this.Employee = data;
      this.leaveLeft = this.totalLeave - data[0].leaveCount;
    });
  }

  employeeLeaves() {
    this.employeeLeaveStatus.employeeSpecificLeave().subscribe((data) => {
      this.managerLeaves = data;
      this.updateLeaveForm.value.leaveId = data[0].leaveId;
      this.leaveCount = this.managerLeaves.length;
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
    this.managerLeaveStatusService.revokeLeave(this.leave).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => alert('Something went wronge.')
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
    this.employeeLeaveStatus.updateLeave(this.leave).subscribe(
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
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  managerLeaves: Leave[];
  public Employee: Employee[];
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
    private employeeLeaveStatus: EmployeeLeaveStatusService,
    private managerLeaveStatusService: ManagerLeaveStatusService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {
    this.minDate = new Date(this.currentYear, this.currentMonth, this.currentDate);

    // for( let i = 0; i < 5; i++) {
    this.employeeLeaves();
    // }
  }

  ngOnInit(): void {
    this.employeeDetails();
  }

  //Employee Detail
  employeeDetails() {
    this.managerLeaveStatusService.getEmployeeDetail().subscribe((data) => {
      this.Employee = data;
      this.leaveLeft = this.totalLeave - data[0].leaveCount;
    });
  }

  employeeLeaves() {
    this.employeeLeaveStatus.employeeSpecificLeave().subscribe((data) => {
      this.managerLeaves = data;
      // for(let i = 0; i < data.length; i++) {
      // this.updateLeaveForm.value.leaveId = data[i].leaveId;
      // }
      this.updateLeaveForm.value.leaveId = data[0].leaveId;
      // this.updateLeaveForm.value.reason = data[0].reason;
      // this.updateLeaveForm.value.endDate = data[0].endDate;
      // this.updateLeaveForm.value.startDate = data[0].startDate;
      // this.updateLeaveForm.value.leaveType = data[0].leaveType;

      this.leaveCount = this.managerLeaves.length;
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
