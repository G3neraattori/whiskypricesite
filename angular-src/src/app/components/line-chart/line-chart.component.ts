import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { AlkodataService } from "../../services/alkodata.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent{
  adata!: any
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(private alkodata: AlkodataService) {
  }

  ngOnInit() {
    this.alkodata.getData().subscribe(data => {
      this.adata = (data as any).body.data;
      console.log(this.adata)
    }, err => {
      console.log(err)
      return false;
    });
  }

  pressMe(){
    console.log(this.adata[0].products[0].price)
    this.lineChartData.datasets[0].data = [this.adata[0].products[0].price]
  }

}
