import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../model/Employee';
import { EmployeeDetailsService } from './employee-details.service';
import { NotificationService } from '../../Service/notification.service';
// import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeLoginRole } from 'src/app/model/EmployeeLoginRole';
import { Login } from 'src/app/model/Login';
import { UpdateEmployee } from 'src/app/model/UpdateEmployee';
// import { DeleteEmployeeDTO } from 'src/app/model/DeleteEmployeeDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateEmployee } from 'src/app/model/CreateEmployee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {
  private formSubmitAttempt?: boolean;
  private formUpdateAttempt?: boolean;

  employeeManagers: Employee[];
  employeesWithRole: EmployeeLoginRole[];
  employee: Employee = new Employee();
  updateEmployeeDTO: UpdateEmployee = new UpdateEmployee();
  deletedEmployee: Employee[];
  createdEmployeeDTO: CreateEmployee = new CreateEmployee();
  closeResult = '';

    isVisible?: number = 1;
  isChecked: boolean = false;

  loginDetail: Login[] | undefined;
  login: Login = new Login();
  deleteEmployeeDTO: EmployeeLoginRole = new EmployeeLoginRole();

  displayedColumns: string[] = [
    'name',
    'designation',
    'doj',
    'qualification',
    'dob',
    'contact',
    'reporting',
    'username',
    'role',
    'customColumn1',
  ];
  dataSource: MatTableDataSource<EmployeeLoginRole> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private employeeDetailsService: EmployeeDetailsService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private modalService: NgbModal, // private location: Location,
    private tosterService: ToastrService
  ) {
    this.allDeletedEmployees();
  }

  ngOnInit() {
    this.employeesDetails();
  }

  allDeletedEmployees() {
    this.employeeDetailsService.findAllDeletedEmployees().subscribe((data) => {
      this.deletedEmployee = data;
    });
  }

  employeesDetails() {
    this.employeeDetailsService.employeeWithLoginRole().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log("Stringify Data -> "+ JSON.stringify(data));
      console.log("JSON data => "+ data);

      this.ngAfterViewInit();
      this.employeesWithRole = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // To create a new employee
  // createEmployeeForm = this.formBuilder.group({
  //   eName: [
  //     '',
  //     [Validators.required, Validators.pattern('([A-Za-z][A-Za-z ]+)')],
  //   ],
  //   eDesignation: [
  //     '',
  //     [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
  //   ],
  //   doj: ['', [Validators.required]],
  //   qualification: ['', [Validators.required]],
  //   dob: ['', [Validators.required]],
  //   contact: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern(
  //         '([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])'
  //       ),
  //     ],
  //   ],
  //   reporting: [
  //     '',
  //     [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
  //   ],
  //   loginID: ['', [Validators.required]],
  // });

  // get eName() {
  //   return this.createEmployeeForm.get('eName');
  // }
  // get eDesignaton() {
  //   return this.createEmployeeForm.get('eDesignation');
  // }
  // get doj() {
  //   return this.createEmployeeForm.get('doj');
  // }
  // get qualification() {
  //   return this.createEmployeeForm.get('qualification');
  // }
  // get dob() {
  //   return this.createEmployeeForm.get('dob');
  // }
  // get contact() {
  //   return this.createEmployeeForm.get('contact');
  // }
  // get reporting() {
  //   return this.createEmployeeForm.get('reporting');
  // }
  // get loginID() {
  //   return this.createEmployeeForm.get('loginID');
  // }

  createEmployeeForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]+)(?=^.{8,20}$).*$'
        ),
      ],
    ],
    roleId: ['', [Validators.required, Validators.pattern('[2-3]')]],
    employeeName: [
      '',
      [Validators.required, Validators.pattern('([A-Za-z][A-Za-z ]+)')],
    ],
    designation: [
      '',
      [Validators.required, Validators.pattern('([a-zA-Z][a-zA-Z ]+)')],
    ],
    dateOfJoining: ['', [Validators.required]],
    qualification: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
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
    loginId: ['',],
  });

  get getUserName() {
    return this.createEmployeeForm.get('userName');
  }
  get getPassword() {
    return this.createEmployeeForm.get('password');
  }
  get getRoleId() {
    return this.createEmployeeForm.get('roleId');
  }
  get getEmployeeName() {
    return this.createEmployeeForm.get('employeeName');
  }
  get getDesignation() {
    return this.createEmployeeForm.get('designation');
  }
  get getDateOfJoining() {
    return this.createEmployeeForm.get('dateOfJoining');
  }
  get getQualification() {
    return this.createEmployeeForm.get('qualification');
  }
  get getDateOfBirth() {
    return this.createEmployeeForm.get('dateOfBirth');
  }
  get getContact() {
    return this.createEmployeeForm.get('contact');
  }
  get getReporting() {
    return this.createEmployeeForm.get('reporting');
  }
  get getLoginId() {
    return this.createEmployeeForm.get('loginId');
  }

  saveEmployee() {
    this.employeeDetailsService.saveDetailsEmployee(this.createdEmployeeDTO).subscribe(
      (data) => {
        this.showToastrCreated();
        this.ngOnInit();
      },
      (error) => {
        this.tosterService.error("Something went wrong");
        // alert('Something went wrong')
      }
    );
    this.formSubmitAttempt = true;
  }

  //To update an employee detail
  updateEmployeeForm = this.formBuilder.group({
    loginId: ['', [Validators.required]],
    roleId: ['', [Validators.required]],
    name: [
      '',
      [Validators.required, Validators.pattern('([A-Za-z][A-Za-z ]+)')],
    ],
    designation: [
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

  get UpdateloginId() {
    return this.updateEmployeeForm.get('loginId');
  }
  get UpdateRoleId() {
    return this.updateEmployeeForm.get('roleId');
  }
  get ename() {
    return this.updateEmployeeForm.get('name');
  }
  get edesignaton() {
    return this.updateEmployeeForm.get('designation');
  }
  get dateOfJoining() {
    return this.updateEmployeeForm.get('doj');
  }
  get eQualification() {
    return this.updateEmployeeForm.get('qualification');
  }
  get dateOfBirth() {
    return this.updateEmployeeForm.get('dob');
  }
  get Contact() {
    return this.updateEmployeeForm.get('contact');
  }
  get Reporting() {
    return this.updateEmployeeForm.get('reporting');
  }

  updateAnEmployee() {
    this.employeeDetailsService
      .updateEmployeeDetails(this.updateEmployeeDTO)
      .subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => alert('Something went wrong') //this.ngOnInit()
      );
    this.formUpdateAttempt = true;
  }

  //To delete an employee
  deleteEmployeeForm = this.formBuilder.group({
    loginId: ['', [Validators.required]],
  });

  get EmployeeLoginId() {
    return this.deleteEmployeeForm.get('loginId');
  }

  deleteEmployeeDetail() {
    this.employeeDetailsService
      .deleteEmployee(this.deleteEmployeeForm.get('loginId')?.value)
      .subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => alert('Something went wrong') //this.ngOnInit()
      );
    this.formUpdateAttempt = true;
  }

  // To add a employee
  createLoginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]+)(?=^.{8,20}$).*$'
        ),
      ],
    ],
    roleRid: ['', [Validators.required, Validators.pattern('[2-3]')]],
  });

  get userName() {
    return this.createLoginForm.get('username');
  }
  get password() {
    return this.createLoginForm.get('password');
  }
  get roleId() {
    return this.createLoginForm.get('roleRid');
  }

  saveLoginDetails() {
    this.employeeDetailsService.saveLogin(this.login).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => alert('Something went wrong') //this.ngOnInit()
    );
    this.formSubmitAttempt = true;
  }

  rowItemsForEmployee(employee: any) {
    this.updateEmployeeForm.patchValue(employee);
    this.deleteEmployeeForm.patchValue(employee);
  }

  showToastrDeleted() {
    this.notify.showWarning('Deleted successfully !!');
  }

  showToastrCreated() {
    this.notify.showInfo('Created successfully !!');
  }

  showToastrUpdated() {
    this.notify.showSuccess('Updated successfully !!');
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
}
