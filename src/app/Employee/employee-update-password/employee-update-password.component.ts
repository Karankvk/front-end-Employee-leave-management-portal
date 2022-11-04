import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee';
import { Login } from 'src/app/model/Login';
import { UpdatePassword } from 'src/app/model/UpdatePassword';
import { NotificationService } from 'src/app/Service/notification.service';
import { EmployeeUpdatePasswordService } from './employee-update-password.service';

@Component({
  selector: 'app-employee-update-password',
  templateUrl: './employee-update-password.component.html',
  styleUrls: ['./employee-update-password.component.css'],
})
export class EmployeeUpdatePasswordComponent implements OnInit {
  private formUpdateAttempt?: boolean;
  employee: Employee[] = [];
  updatePassword: UpdatePassword = new UpdatePassword();
  selected = 'none';

  constructor(
    private employeeUpdatePasswordService: EmployeeUpdatePasswordService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private router: Router,
    private location: Location,
  ) {
    this.employeeUpdatePasswordService.getSpecificEmployee().subscribe(data => {
      // this.employee = data;
      this.update_form.value.loginId = data[0].loginId;
    });

  }

  ngOnInit(): void {}

  // To update login details
  update_form = this.formBuilder.group({
    currentPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        '(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]+)(?=^.{8,20}$).*$'
      ),
    ]],
    newPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        '(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]+)(?=^.{8,20}$).*$'
      ),
    ]],
    loginId: ['', [Validators.required]],
  });

  get oldPassword() {
    return this.update_form.get('currentPassword');
  }
  get newPassword() {
    return this.update_form.get('newPassword');
  }
  get loginId() {
    return this.update_form.get('loginId');
  }

  updateLoginDetails() {
    // if (this.updatePassword.loginId == this.employee[0].loginId) {
      this.employeeUpdatePasswordService
      .updateEmployeePassword(this.updatePassword)
      .subscribe(
        (data) => { },
        (error) => this.goBack()
      );
      this.formUpdateAttempt = true;
      this.showToastrUpdated();
    // }
    // else {
      // alert("Login ID is incorret.");
    // }
  }

  showToastrUpdated() {
    this.notify.showSuccess("Updated successfully !! 🎊✨");
  }

  goBack() {
    this.location.back();
  }

  rowItems(employee: any) {
    this.update_form.patchValue(employee);

  }

}
