import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  blankUrl = '';
	currentUrl: string = '';
	checkoutUrls = ['/login'];

  title: string;


  constructor(private router: Router) {
    this.title = 'EmployeeLeaveManagementPortal';
    // router.events.filter((e: any) => e instanceof NavigationEnd)
    // .subscribe((e: NavigationEnd) => {
    //   this.currentUrl = e.url;
    //   setTimeout(callback => {
    //     window.scrollTo(0, 0);
    //   }, 100)
    // });
  }
  // isCheckoutRoute() {
	// 	if (!this.currentUrl) {
	// 		return false;
	// 	}
	// 	const index = this.checkoutUrls.indexOf(this.currentUrl);
	// 	if (index >= 0) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

}
