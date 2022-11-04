import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { LoginComponent } from '../login/login.component';
import { NotificationService } from '../../Service/notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private notify: NotificationService,
    // private loginComponent: LoginComponent
  ) {}

  ngOnInit(): void {}

  successfullyLogout() {
    this.notify.showWarning('Logout successfully !!');
  }

  // sidenav() {
  //   this.loginComponent.authentication = false;
  // }
}
