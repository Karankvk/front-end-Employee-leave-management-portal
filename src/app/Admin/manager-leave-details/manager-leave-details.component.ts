import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeLeaveDTO } from 'src/app/model/EmployeeLeaveDTO';
import { Leave } from '../../model/Leave';
import { NotificationService } from '../../Service/notification.service';
import { ManagerLeaveDetailsService } from './manager-leave-details.service';

@Component({
  selector: 'app-manager-leave-details',
  templateUrl: './manager-leave-details.component.html',
  styleUrls: ['./manager-leave-details.component.css'],
})
export class ManagerLeaveDetailsComponent implements OnInit {
  leaves: EmployeeLeaveDTO[] | undefined;

  revokeLeaves?: EmployeeLeaveDTO[];
  leave: Leave = new Leave();
  private formUpdateAttempt: boolean | undefined;
  leaveStatus: boolean = true;
  isVisible?: number = 1;
  isChecked: boolean = true;
  employeeLeaves: EmployeeLeaveDTO[];

  constructor(
    private router: Router,
    private managerLeaveDetailsService: ManagerLeaveDetailsService,
    private formBuilder: FormBuilder,
    private notify: NotificationService
  ) {
    this.allManagerRevokeLeaves();
    this.allEmployeeLeaves();
  }

  ngOnInit() {
    this.allManagerLeaves();
  }

  allManagerLeaves() {
    this.managerLeaveDetailsService.findAllLeave().subscribe((data) => {
      this.leaves = data;
    });
  }

  allManagerRevokeLeaves() {
    this.managerLeaveDetailsService.revokeLeave().subscribe(data => {
      this.revokeLeaves = data;
    });
  }

  allEmployeeLeaves() {
    this.managerLeaveDetailsService.findAllEmployeeLeaves().subscribe(data => {
      this.employeeLeaves = data;
    })
  }

  // Update Leave Status
  approvedLeaveform = this.formBuilder.group({
    leaveId: ['', [
      Validators.required
    ]]
  });

  get leaveID() {
    return this.approvedLeaveform.get('leaveId');
  }

  approveLeave() {
    console.log(this.leaves)
    this.managerLeaveDetailsService.updateLeaveStatus(this.leave).subscribe(
      (data) => {
        this.ngOnInit()
      },
      (error) => alert("Something went wronge.")
    );
    this.formUpdateAttempt = true;
  }

  // Delete Leave
  rejectLeaveform = this.formBuilder.group({
    leaveId: ['', [
      Validators.required
    ]],
  });

  get LeaveID() {
    return this.rejectLeaveform.get('leaveId');
  }

  RejectLeave() {
    this.managerLeaveDetailsService.rejectLeave(this.leave).subscribe(
      (data) => { this.ngOnInit() },
      (error) => alert("Something went wronge."),
    );
    this.formUpdateAttempt = true;
  }

// Toastr
  showToastrUpdated() {
    this.notify.showSuccess("Leave approved !! 🎐🎉");
  }

  showToastrRejected() {
    this.notify.showSuccess("Rejected successfully !! 😈");
  }

  // Auto fill
  rowItems(leave: any) {
    this.leave = leave;
  }

}
