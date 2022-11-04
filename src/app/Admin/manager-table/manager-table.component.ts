import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from '../employee-details/employee-details.service';
import { Employee } from '../../model/Employee';
import { NotificationService } from '../../Service/notification.service';
import { Login } from 'src/app/model/Login';

@Component({
  selector: 'app-manager-table',
  templateUrl: './manager-table.component.html',
  styleUrls: ['./manager-table.component.css']
})
export class ManagerTableComponent implements OnInit {

  private formSubmitAttempt?: boolean;
  private formUpdateAttempt?: boolean;

  employeeManagers?: Employee[];
  login: Login = new Login();
  employee: Employee = new Employee();

  constructor(
    private router: Router,
    private employeeDetailsService: EmployeeDetailsService,
    private formBuilder: FormBuilder,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.employeeDetailsService.findAllManager().subscribe(data => {
      this.employeeManagers = data;
    });
  }

  // To create a new employee
  create_form = this.formBuilder.group({
    eName: [
      '',
      [Validators.required, Validators.pattern('([A-Za-z][A-Za-z ]+)')],
    ],
    eDesignation: [
      '',
      [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
    ],
    doj: ['', [Validators.required]],
    qualification: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    contact: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])'
        ),
      ],
    ],
    reporting: [
      '',
      [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
    ],
    loginID: ['', [Validators.required]],
  });

  get eName() {
    return this.create_form.get('eName');
  }
  get eDesignaton() {
    return this.create_form.get('eDesignation');
  }
  get doj() {
    return this.create_form.get('doj');
  }
  get qualification() {
    return this.create_form.get('qualification');
  }
  get dob() {
    return this.create_form.get('dob');
  }
  get contact() {
    return this.create_form.get('contact');
  }
  get reporting() {
    return this.create_form.get('reporting');
  }
  get loginID() {
    return this.create_form.get('loginID');
  }

  saveEmployee() {
    this.employeeDetailsService.saveDetailsEmployee(this.employee).subscribe(
      (data) => {},
      (error) => this.ngOnInit()
    );
    this.formSubmitAttempt = true;
  }

  //To update an employee detail
  update_form = this.formBuilder.group({
    employeeId: ['', [Validators.required]],
    eName: [
      '',
      [Validators.required, Validators.pattern('([A-Za-z][A-Za-z ]+)')],
    ],
    eDesignation: [
      '',
      [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
    ],
    doj: ['', [Validators.required]],
    qualification: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    contact: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])'
        ),
      ],
    ],
    reporting: [
      '',
      [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
    ],
  });

  get employeeId() {
    return this.update_form.get('employeeId');
  }
  get ename() {
    return this.update_form.get('eName');
  }
  get edesignaton() {
    return this.update_form.get('eDesignation');
  }
  get dateOfJoining() {
    return this.update_form.get('doj');
  }
  get eQualification() {
    return this.update_form.get('qualification');
  }
  get dateOfBirth() {
    return this.update_form.get('dob');
  }
  get Contact() {
    return this.update_form.get('contact');
  }
  get Reporting() {
    return this.update_form.get('reporting');
  }

  updateAnEmployee() {
    this.employeeDetailsService.updateEmployee(this.employee).subscribe(
      (data) => {},
      (error) => this.ngOnInit()
    );
    this.formUpdateAttempt = true;
  }

  //To delete an employee
  // delete_form = this.formBuilder.group({
  //   employeeId: ['', [Validators.required]],
  // });

  // get EmployeeId() {
  //   return this.delete_form.get('employeeId');
  // }

  // deleteEmployee() {
  //   this.employeeDetailsService.deleteEmployee(this.login).subscribe(
  //     (data) => {},
  //     (error) => this.ngOnInit()
  //   );
  //   this.formUpdateAttempt = true;
  // }

  // rowItems(employee: any) {
  //   this.update_form.setValue(employee);
  //   this.delete_form.setValue(employee);
  // }

  // showToastrDeleted() {
  //   this.notify.showWarning("Deleted successfully !!");
  // }

  // showToastrCreated() {
  //   this.notify.showInfo("Created successfully !!");
  // }

  // showToastrUpdated() {
  //   this.notify.showSuccess("Updated successfully !!");
  // }

}
