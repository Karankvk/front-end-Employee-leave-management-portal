import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeInformationCSV } from 'src/app/model/EmployeeInformationCSV';
import { ExcelDataService } from './excel-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { RxwebValidators, IpVersion } from '@rxweb/reactive-form-validators';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-excel-data',
  templateUrl: './excel-data.component.html',
  styleUrls: ['./excel-data.component.css'],
})
export class ExcelDataComponent implements OnInit, AfterViewInit {
  employeeInformation: EmployeeInformationCSV = new EmployeeInformationCSV();
  closeResult = '';
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  mobileMask = [
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  // ipMask = [
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   '.',
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   '.',
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   /\d/,
  // ];

  orderByEmployeeIdInfo: EmployeeInformationCSV[] = [];
  orderByEmployeeGenderInfo: EmployeeInformationCSV[] = [];
  orderByEmployeeNameInfo: EmployeeInformationCSV[] = [];

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'gender',
    'ipAddress',
    'mobile',
    'customeColumn1',
  ];
  dataSource: MatTableDataSource<EmployeeInformationCSV> =
    new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private excelDataService: ExcelDataService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notification: NotificationService
  ) {
    this.orderByEmployeeGender();
    this.orderByEmployeeName();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.employeeDetails();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public employeeDetails() {
    this.excelDataService.orderById().subscribe((jsonData) => {
      this.orderByEmployeeIdInfo = jsonData;
      this.dataSource = new MatTableDataSource(jsonData);
      this.ngAfterViewInit();
    });
  }

  public orderByEmployeeGender() {
    this.excelDataService.orderByGender().subscribe((data) => {
      this.orderByEmployeeGenderInfo = data;
    });
  }

  public orderByEmployeeName() {
    this.excelDataService.orderByName().subscribe((data) => {
      this.orderByEmployeeNameInfo = data;
    });
  }

  createEmployeeForm = this.formBuilder.group({
    // employeeId: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    // ipAddress: ['', [Validators.required, Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')],],
    ipAddress: [
      '',
      [Validators.required, RxwebValidators.ip({ version: IpVersion.AnyOne })],
    ],
    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern(
          // '([0-9][0-9][0-9][-][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9])'
          '([0-9]{3}[-][0-9]{3}[-][0-9]{4})'
        ),
      ],
    ],
  });

  // get getEmployeeId() {
  //   return this.createEmployeeForm.get('employeeId');
  // }

  get getFirstName() {
    return this.createEmployeeForm.get('first_name');
  }

  get getLastName() {
    return this.createEmployeeForm.get('last_name');
  }

  get getEmail() {
    return this.createEmployeeForm.get('email');
  }

  get getGender() {
    return this.createEmployeeForm.get('gender');
  }

  get getIpAddress() {
    return this.createEmployeeForm.get('ipAddress');
  }

  get getMobile() {
    return this.createEmployeeForm.get('mobile');
  }

  createEmployee() {
    this.excelDataService.createEmployee(this.employeeInformation).subscribe(
      (data) => {
        this.ngOnInit();
        this.successToster();
      },
      (error) => {
        this.errorToster();
      }
    );
  }

  updateEmployeeForm = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    ipAddress: ['', [Validators.required]],
    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '([0-9][0-9][0-9][-][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9])'
        ),
      ],
    ],
    employeeId: ['', [Validators.required]],
  });

  get getEditFirstName() {
    return this.updateEmployeeForm.get('first_name');
  }

  get getEditLastName() {
    return this.updateEmployeeForm.get('last_name');
  }

  get getEditEmail() {
    return this.updateEmployeeForm.get('email');
  }

  get getEditGender() {
    return this.updateEmployeeForm.get('gender');
  }

  get getEditIpAddress() {
    return this.updateEmployeeForm.get('ipAddress');
  }

  get getEditMobile() {
    return this.updateEmployeeForm.get('mobile');
  }

  get getEditEmployeeId() {
    return this.updateEmployeeForm.get('employeeId');
  }

  updateEmployee() {
    this.excelDataService.updateEmployee(this.employeeInformation).subscribe(
      (data) => {
        this.ngOnInit();
        this.infoToster();
      },
      (error) => { this.errorToster(); }
    );
  }

  deleteEmployeeForm = this.formBuilder.group({
    employeeId: ['', [Validators.required]],
  });

  get getDeleteEmployeeId() {
    return this.deleteEmployeeForm.get('firstName');
  }

  deleteEmployee() {
    this.excelDataService.deleteEmployee(this.employeeInformation).subscribe(
      (data) => {
        this.ngOnInit();
        this.deleteToster();
      },
      (error) => { this.errorToster(); }
    );
  }

  rowItemsForEmployee(employees: any) {
    this.updateEmployeeForm.patchValue(employees);
  }
  rowItemsForDeleteEmployee(employeeId: any) {
    this.deleteEmployeeForm.patchValue(employeeId);
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.excelDataService.saveExcel(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              this.ngOnInit();
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.excelDataService.orderById();
              this.ngOnInit();
            }
            this.ngOnInit();
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message =
                'Something went wrong 😨😱. Could not upload the file! 😭';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  successToster() {
    this.notification.showSuccess('Employee added successfully. 🎊🧧');
  }

  infoToster() {
    this.notification.showInfo('Details updated successfully. 🎉🎐');
  }

  deleteToster() {
    this.notification.showWarning("Employee deleted successfully. 😔😭");
  }

  errorToster() {
    this.notification.showError(
      'Something went worng. Please check your details. 😱'
    );
  }

  // PDF

  // To add page count
  addFooters = (doc: jsPDF) => {
    const pageCount = doc.getNumberOfPages();

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        'Page ' + String(i) + ' of ' + String(pageCount),
        doc.internal.pageSize.width / 2,
        287,
        {
          align: 'center',
        }
      );
    }
  };

  // To add image
  img = './../../assets/bsol-logo-1.png';

  head = [
    [
      {
        content: 'S.No.',
        styles: {
          halign: 'center',
          fontStyle: 'bolditalic',
          textColor: 10,
          fillColor: [148, 247, 176],
        },
      },
      {
        content: 'Name',
        styles: {
          halign: 'center',
          fontStyle: 'bolditalic',
          textColor: 10,
          fillColor: [148, 247, 176],
        },
      },
      {
        content: 'Email',
        styles: {
          halign: 'center',
          fontStyle: 'bolditalic',
          textColor: 10,
          fillColor: [148, 247, 176],
        },
      },
      {
        content: 'Gender',
        styles: {
          halign: 'center',
          fontStyle: 'bolditalic',
          textColor: 10,
          fillColor: [148, 247, 176],
        },
      },
      {
        content: 'Ip-Address',
        styles: {
          halign: 'center',
          fontStyle: 'bolditalic',
          textColor: 10,
          fillColor: [148, 247, 176],
        },
      },
      {
        content: 'Mobile',
        styles: {
          halign: 'center',
          fontStyle: 'bolditalic',
          textColor: 10,
          fillColor: [148, 247, 176],
        },
      },
    ],
  ];

  createGenderSortPdf() {
    var doc = new jsPDF();
    doc.setFontSize(28);
    doc.setTextColor(10);
    doc.setFont('italic');
    doc.text('Employee Details', 13, 10);
    doc.line(13, 12, 84, 12);
    doc.setTextColor(70);
    doc.addImage(this.img, 'png', 175, 1, 25, 10);

    let data = [];
    let count = 0;
    for (let i = 0; i < this.orderByEmployeeGenderInfo.length; i++) {
      data.push([
        {
          // content: this.orderByEmployeeGenderInfo[i].employeeId.toString(),
          content: ++count,
          styles: {
            halign: 'Right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
        {
          content:
            this.orderByEmployeeGenderInfo[i].first_name +
            ' ' +
            this.orderByEmployeeGenderInfo[i].last_name,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        // { content: this.orderByEmployeeGenderInfo[i].lastName, styles: { halign: 'center' } },
        {
          content: this.orderByEmployeeGenderInfo[i].email,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        {
          content: this.orderByEmployeeGenderInfo[i].gender,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        {
          content: this.orderByEmployeeGenderInfo[i].ipAddress,
          styles: {
            halign: 'right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
        {
          content: this.orderByEmployeeGenderInfo[i].mobile,
          styles: {
            halign: 'right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
      ]);
    }

    (doc as any).autoTable({
      head: this.head,
      body: data,
      theme: 'grid',
      margin: [20, 12, 20, 12],
    });

    // add footer in pdf
    this.addFooters(doc);

    // below line for Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // below line for Download PDF document
    doc.save('employeeDetails.pdf');
  }

  createIdSortPdf() {
    var doc = new jsPDF();
    doc.setFontSize(28);
    doc.setTextColor(10);
    doc.setFont('italic');
    doc.text('Employee Details', 13, 10);
    doc.line(13, 12, 84, 12);
    doc.setTextColor(70);
    doc.addImage(this.img, 'png', 175, 1, 25, 10);

    let data = [];
    let count = 0;
    for (let i = 0; i < this.orderByEmployeeIdInfo.length; i++) {
      data.push([
        {
          // content: this.orderByEmployeeIdInfo[i].employeeId.toString(),
          content: ++count,
          styles: {
            halign: 'Right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
        {
          content:
            this.orderByEmployeeIdInfo[i].first_name +
            ' ' +
            this.orderByEmployeeIdInfo[i].last_name,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        // { content: this.orderByEmployeeIdInfo[i].lastName, styles: { halign: 'center' } },
        {
          content: this.orderByEmployeeIdInfo[i].email,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        {
          content: this.orderByEmployeeIdInfo[i].gender,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        {
          content: this.orderByEmployeeIdInfo[i].ipAddress,
          styles: {
            halign: 'right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
        {
          content: this.orderByEmployeeIdInfo[i].mobile,
          styles: {
            halign: 'right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
      ]);
    }

    (doc as any).autoTable({
      head: this.head,
      body: data,
      theme: 'grid',
      margin: [20, 12, 20, 12],
    });

    // add footer in pdf
    this.addFooters(doc);

    // below line for Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // below line for Download PDF document
    doc.save('employeeDetails.pdf');
  }

  createNameSortPdf() {
    var doc = new jsPDF();
    doc.setFontSize(28);
    doc.setTextColor(10);
    doc.setFont('italic');
    doc.text('Employee Details', 13, 10);
    doc.line(13, 12, 84, 12);
    doc.setTextColor(70);
    doc.addImage(this.img, 'png', 175, 1, 25, 10);

    let data = [];
    let count = 0;
    for (let i = 0; i < this.orderByEmployeeNameInfo.length; i++) {
      data.push([
        {
          // content: this.orderByEmployeeNameInfo[i].employeeId.toString(),
          content: ++count,
          styles: {
            halign: 'Right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
        {
          content:
            this.orderByEmployeeNameInfo[i].first_name +
            ' ' +
            this.orderByEmployeeNameInfo[i].last_name,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        // { content: this.orderByEmployeeNameInfo[i].lastName, styles: { halign: 'center' } },
        {
          content: this.orderByEmployeeNameInfo[i].email,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        {
          content: this.orderByEmployeeNameInfo[i].gender,
          styles: { halign: 'left', textColor: 40, fillColor: [232, 235, 233] },
        },
        {
          content: this.orderByEmployeeNameInfo[i].ipAddress,
          styles: {
            halign: 'right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
        {
          content: this.orderByEmployeeNameInfo[i].mobile,
          styles: {
            halign: 'right',
            textColor: 40,
            fillColor: [232, 235, 233],
          },
        },
      ]);
    }

    (doc as any).autoTable({
      head: this.head,
      body: data,
      theme: 'grid',
      margin: [20, 12, 20, 12],
    });

    // add footer in pdf
    this.addFooters(doc);

    // below line for Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // below line for Download PDF document
    doc.save('employeeDetails.pdf');
  }
}
