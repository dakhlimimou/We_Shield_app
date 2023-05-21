import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss'],
})
export class UserActivityComponent implements OnInit {
  public chart: any;
  constructor() {}

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Overall User Activity',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: '#3a76ea',
          },
        ],
      },
      options: {},
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
