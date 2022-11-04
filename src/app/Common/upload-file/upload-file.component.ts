import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileModel } from 'src/app/model/FileModel';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  files: FileModel[];
  fileModel: FileModel = new FileModel();
  formUpdateAttempt: boolean = false;
  closeResult = '';
  fileUrl: any;

  // Imagesrc = "./../../assets/Itachi.jpg";

  constructor(
    private uploadFileService: UploadFileService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.fileDetails();
    // var Imagesrc = `./../../assets/${this.files}`
    // for (let i = 0; i < 5; i++) {
    //   console.log("Files data => "+ this.files[0]);

    // }
  }

  fileDetails() {
    this.uploadFileService.getFiles().subscribe((data) => {
      this.files = data;
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
        this.uploadFileService.saveFile(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              this.ngOnInit();
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadFileService.getFiles();
            }
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

  //To soft delete a file
  softDeleteFileForm = this.formBuilder.group({
    fileName: ['', [Validators.required]],
  });

  get getFileName() {
    return this.softDeleteFileForm.get('fileName');
  }

  softDeleteFile() {
    this.uploadFileService.softDelete(this.fileModel).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => alert('Something went wrong') //this.ngOnInit()
    );
    this.formUpdateAttempt = true;
  }

  //To permanent delete a file
  permanentDeleteFileForm = this.formBuilder.group({
    fileName: ['', [Validators.required]],
  });

  get getFile() {
    return this.softDeleteFileForm.get('fileName');
  }

  permanentDeleteFile() {
    this.uploadFileService.permanentDelete(this.fileModel).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => alert('Something went wrong') //this.ngOnInit()
    );
    this.formUpdateAttempt = true;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  rowItemForFileName(fileName: any) {
    this.softDeleteFileForm.patchValue(fileName);
    this.permanentDeleteFileForm.patchValue(fileName);
  }



  download(file: any) {
    console.log("File name=> " + file.fileName);
    const fileName = file.fileName;
    let url = file.fileUrl;
    console.log("before concatinate => "+ url);
    url = url + fileName;
    console.log("File url => "+ url);
    var afterDot = fileName.substr(fileName.indexOf('.')+1);
    console.log(afterDot);
    saveAs(new File([`/Save files/${fileName}`], fileName, { type: afterDot}));
    // var blob = new Blob([url], {type: afterDot});
    // saveAs(blob, fileName);
  }
}

