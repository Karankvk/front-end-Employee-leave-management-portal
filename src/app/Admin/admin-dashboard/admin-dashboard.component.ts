import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminDashboardService } from './admin-dashborad.service';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements AfterContentInit {
  @ViewChild('grid') grid?: MatGridList;
  public empCount?: number;
  public manCount?: number;
  public leaCount?: number;
  public userName?: string;
  private percentage: Array<any> = [];
  //Charts
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any;
  public lineChartLegend: boolean = true;
  gridByBreakpoint: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private adminDashboardService: AdminDashboardService,
    private mediaObserver: MediaObserver
  ) {
    this.employeeCount();
    this.managerCount();
    this.leaveCount();
    this.userName = 'Siba Sankar';
    this.chart(this.percentage);
    this.managerEmployeePercentage();
  }

  employeeCount() {
    this.adminDashboardService.countEmployee().subscribe((data) => {
      this.empCount = data;
    });
  }

  managerCount() {
    this.adminDashboardService.countManager().subscribe((data) => {
      this.manCount = data;
    });
  }

  leaveCount() {
    this.adminDashboardService.countManagerLeave().subscribe((data) => {
      this.leaCount = data;
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  menuItems = [
    'managerDetails',
    'employeeDetails',
    'createEmployee',
    'roles',
    'managerLeaveDetails',
    'logout',
  ];

  ngAfterContentInit() {
    // this.mediaObserver.asObservable().subscribe((change: MediaChange) => {
    //   this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    // });
  }

  managerEmployeePercentage() {
    this.adminDashboardService.attendencePercentage().subscribe((data) => {
      this.percentage = data;
      this.chart(this.percentage);
    });
  }

  //Chart
  chart(percent: any) {
    this.lineChartData = [
      {
        label: 'Attendence percentage',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: percent,
      },
    ];

    this.lineChartLabels = ['Manager', 'Employee'];
    this.lineChartOptions = {
      responsive: true,
      horizontalLine: [
        {
          // use custom global plugin
          y: 82,
          style: 'rgba(255, 0, 0, .4)',
          text: 'max',
        },
        {
          y: 60,
          style: '#00ffff',
        },
        {
          y: 44,
          text: 'min',
        },
      ],
    };
    this.lineChartLegend = true;
    // lineChartType = 'bar';
  }
}
