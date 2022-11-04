import { Component, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SideNavBarService } from './side-nav-bar.service';
import { Employee } from '../../model/Employee';


@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css'],
})
export class SideNavBarComponent {

  public menuItems: any;
  public employeeName: string = '';
  public admin: boolean = false;
  public manager: boolean = false;
  public employee: boolean = false;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public employeeLoginId: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sideNavBarService: SideNavBarService,
    private cdr: ChangeDetectorRef
  ) {
    this.sideNavBarService.getEmployeeRoleId().subscribe((data) => {
      if (data === 1) {
        this.admin = true;
      } else if (data === 2) {
        this.manager = true;
      } else if (data === 3) {
        this.employee = true;
      }
    });

    this.sideNavBarService.getEmployeeDetail().subscribe((data) => {
      this.employeeName = data[0].eName;
      this.employeeLoginId = data[0].loginId;
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
  );

  public width?: number = 18;
  setWidth(widthNumber: number){
    this.width = widthNumber;
    this.cdr.detectChanges();
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this.sideNavBarService.sideNavState$.next(this.sideNavState)
  }


}
