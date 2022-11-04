import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from 'src/app/Admin/employee-details/employee-details.service';
import { Employee } from 'src/app/model/Employee';
import { EmployeeLeaveDTO } from 'src/app/model/EmployeeLeaveDTO';
import { Leave } from '../../model/Leave';
import { NotificationService } from '../../Service/notification.service';
import { EmployeeLeaveDetailsService } from './employee-leave-details.service';
@Component({
  selector: 'app-employee-leave-details',
  templateUrl: './employee-leave-details.component.html',
  styleUrls: ['./employee-leave-details.component.css'],
})
export class EmployeeLeaveDetailsComponent implements OnInit {
  leaves: Leave[] | undefined;
  leave: Leave = new Leave();
  employeeLeaveDTO?: EmployeeLeaveDTO[];
  private formUpdateAttempt!: boolean ;
  isVisible?: number = 2;
  isChecked: boolean = true;
  leavesRevoke?: EmployeeLeaveDTO[];
  employees?: Employee[];

  constructor(
    private router: Router,
    private employeeLeaveDetailsService: EmployeeLeaveDetailsService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private employeeDetailsService: EmployeeDetailsService
  ) {
    this.allEmployees();
    this.allRevokeLeaves();
  }

  ngOnInit() {
    this.allEmployeeLeaves()
  }

  allEmployees() {
    this.employeeDetailsService.findAllEmployee().subscribe((data) => {
      this.employees = data;
    });
  }

  allRevokeLeaves() {
    this.employeeLeaveDetailsService.revokeLeaves().subscribe((data) => {
      this.leavesRevoke = data;
    });
  }

  allEmployeeLeaves() {
    this.employeeLeaveDetailsService.findAllLeave().subscribe((data) => {
      this.employeeLeaveDTO = data;
    });
  }

  // Update Leave Status
  approvedLeaveform = this.formBuilder.group({
    leaveId: ['', [Validators.required]],
  });

  get leaveID() {
    return this.approvedLeaveform.get('leaveId');
  }

  approveLeave() {
    this.employeeLeaveDetailsService.updateLeaveStatus(this.leave).subscribe(
      (data) => {
        this.ngOnInit()
      },
      (error) => alert("Something went wronge.")
    );
    this.formUpdateAttempt = true;
  }

  // Reject Leave
  rejectLeaveform = this.formBuilder.group({
    leaveId: ['', [Validators.required]],
  });

  get LeaveID() {
    return this.rejectLeaveform.get('leaveId');
  }

  RejectLeave() {
    this.employeeLeaveDetailsService.rejectLeave(this.leave).subscribe(
      (data) => {
        this.ngOnInit()
      },
      (error) => alert("Something went wronge.")
    );
    this.formUpdateAttempt = true;
  }

  // Toastr
  showToastrUpdated() {
    this.notify.showSuccess('Leave approved !! 🎐🎉');
  }

  showToastrRejected() {
    this.notify.showSuccess('Rejected successfully !! 😈');
  }

  // Auto fill
  rowItems(leave: any) {
    this.leave = leave;
  }
}
