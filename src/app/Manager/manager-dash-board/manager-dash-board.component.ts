import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../Admin/admin-dashboard/admin-dashborad.service';
import { ManagerDashBoardService } from './manager-dash-board.service';

@Component({
  selector: 'app-manager-dash-board',
  templateUrl: './manager-dash-board.component.html',
  styleUrls: ['./manager-dash-board.component.css'],
})
export class ManagerDashBoardComponent implements OnInit {
  public empCount?: number;
  public leaCount?: number;
  public reportingTo: string;
  public designation: string;
  public qualification: string;
  private percentage: Array<any> = [];
  //Charts
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any;
  public lineChartLegend: boolean = true;

  constructor(
    private AdminDashboardService: AdminDashboardService,
    private managerDashBoardService: ManagerDashBoardService
  ) {
    this.employeeCount();
    this.leaveCount();
    this.chart(this.percentage);
    this.employeeDetails();
  }

  employeeDetails() {
    this.managerDashBoardService.getEmployeeDetail().subscribe((data) => {
      console.log(data[0]);
      this.designation = data[0].eDesignation;
      this.qualification = data[0].qualification;
      this.reportingTo = data[0].reporting;
      // this.dateOfBirth = this.Employee[0].dob;
      // this.employeeName = this.Employee[0].eName;
    });
  }

  employeeCount() {
    this.AdminDashboardService.countEmployee().subscribe((data) => {
      this.empCount = data;
    });
  }

  leaveCount() {
    this.AdminDashboardService.countEmployeeLeave().subscribe((data) => {
      this.leaCount = data;
    });
  }

  ngOnInit(): void {
    this.managerEmployeePercentage();
  }

  managerEmployeePercentage() {
    this.AdminDashboardService.attendencePercentage().subscribe((data) => {
      this.percentage = data;
      this.chart(this.percentage);
    });
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
      },
    ];
    this.lineChartLabels = [
      'Employee attendence', 'Total'
    ];
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
