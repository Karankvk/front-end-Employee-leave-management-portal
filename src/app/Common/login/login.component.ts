import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../model/Login';
import { LoginService } from './login.service';
import { NotificationService } from '../../Service/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private formSubmitAttempt?: boolean;
  private passwordUpdated?: boolean;
  show: boolean = false;
  login: Login = new Login();
  hide = true;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
  ) {
  }

  ngOnInit(){
  }


  login_form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        '(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]+)(?=^.{8,20}$).*$'
      ),
    ]],
  });

  get username() {
    return this.login_form.get('username');
  }

  get password() {
    return this.login_form.get('password');
  }

  loginUser() {
    this.loginService.loginUser(this.login).subscribe(data => {
      this.login = data;
      if (this.login.roleRid === 1) {
        this.router.navigate(['/layout/adminDashboard']);
      }
      else if (this.login.roleRid === 2) {
        this.router.navigate(['/layout/managerDashboard']);
      }
      else if (this.login.roleRid === 3) {
        this.router.navigate(['/layout/employeeDashboard']);
      }
    }, error => alert("Sorry, please enter correct username and password."));
    this.formSubmitAttempt = true;
  }

  pass() {
    this.show = !this.show;
  }

  imageSrc = 'assets/pexels-eberhard-grossgasteiger-12527029.jpg'
  imageAlt = 'space'

  forget_form = this.formBuilder.group({
    loginId: ['', [
      Validators.required,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        '(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]+)(?=^.{8,20}$).*$'
      )
    ]]
  });

  get lLoginId() {
    return this.forget_form.get('loginId');
  }
  get lPassword() {
    return this.forget_form.get('password');
  }


forgetPassword(){
  this.loginService.forgetPassword(this.login).subscribe(data => {
  }, error => this.router.navigate(['/login']));
    this.passwordUpdated = true;
  }

  rowItems(login: any) {

  }

  showToastrUpdated() {
    this.notify.showSuccess("Updated successfully !!");
  }

  // email = new FormControl('', [Validators.required, Validators.email]);

}
