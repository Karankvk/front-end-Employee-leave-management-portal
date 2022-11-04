import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-successfully-submitted',
  templateUrl: './successfully-submitted.component.html',
  styleUrls: ['./successfully-submitted.component.css']
})
export class SuccessfullySubmittedComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
