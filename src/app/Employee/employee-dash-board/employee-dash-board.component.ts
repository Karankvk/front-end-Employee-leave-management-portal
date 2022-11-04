import { Component } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';
// import { map, shareReplay } from 'rxjs/operators';
import { EmployeeDashBoardService } from './employee-dash-board.service';
import { Employee } from '../../model/Employee';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css'],
})
export class EmployeeDashBoardComponent {
  public Employee?: Employee[];
  public designation?: string;
  public qualification?: string;
  public reportingTo?: string;
  public dateOfBirth?: string;
  public employeeName?: string;
  private percentage: Array<any> = [, 100];
  public leaveLeft: number;
  // private percentage: number = 35;

  //Charts
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any;
  public lineChartLegend: boolean = true;

  constructor(
    // private breakpointObserver: BreakpointObserver,
    private employeeDashBoardService: EmployeeDashBoardService,
  ) {
    this.employeeDashBoardService.getEmployeeDetail().subscribe((data) => {
      this.Employee = data;
      // console.log(this.Employee[0].eDesignation);
      this.designation = this.Employee[0].eDesignation;
      this.qualification = this.Employee[0].qualification;
      this.reportingTo = this.Employee[0].reporting;
      this.dateOfBirth = this.Employee[0].dob;
      this.employeeName = this.Employee[0].eName;
      this.leaveLeft = this.Employee[0].leaveCount;
    });

    this.employeeDashBoardService.getEmployeePercentage().subscribe((data) => {
      this.percentage[0] = data;
      this.chart(this.percentage);
    });
    this.chart(this.percentage);

  }

  employeePercentage() {
    // this.employeeDashBoardService.getEmployeePercentage().subscribe((data) => {
    //   this.percentage = data;
    //   this.chart(this.percentage);
    // });
  }

  //Chart
  chart(percentage: any) {
    this.lineChartData = [
      {
        label: 'My First dataset',
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
        data: percentage,
        print:console.log("Inside graph =>"+percentage),
      },
    ];
    this.lineChartLabels = [this.employeeName + " attendence", 'Total'];
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
