import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { AlkodataService } from "../../services/alkodata.service";
import { BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})


export class LineChartComponent implements OnInit{
  product!: String;
  pSize!: String;
  ppl!: boolean;
  productlist: string[] = [];
  sizelist: string[] = [];

  //Some black magic that makes the chart updates possible
  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;
  adata!: any
  pdata!: any
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = false;
  public lineChartPlugins = [];

  constructor(private alkodata: AlkodataService) {
  }

  ngOnInit() {
    this.alkodata.getLabels().subscribe(data => {
      this.pdata = (data as any).body.data;
      //console.log(this.pdata[0].products)

      for(let i=0; i<this.pdata[0].products.length; i++){
        this.productlist[i] = this.pdata[0].products[i].productName;
      }
      //console.log('plist' + this.productlist)
    }, err => {
      console.log(err)
      return false;
    });
  }

  pressMe(){
    const search = {
      productName: this.product,
      bottleSize: this.pSize
    }


    this.alkodata.getData(search).subscribe(data => {
      this.adata = (data as any).body.data;
      for(let i=0; i<this.adata.length; i++){
        if(this.ppl){
          this.lineChartData.datasets[0].data[i] = this.adata[i].products[0].pricePerLiter;
          // @ts-ignore
          this.lineChartData.labels[i] = this.adata[i].date;
        }else{
          this.lineChartData.datasets[0].data[i] = this.adata[i].products[0].price;
          // @ts-ignore
          this.lineChartData.labels[i] = this.adata[i].date;
        }

      }
      this.lineChartData.datasets[0].label = this.product.toString()
      this.lineChartLegend = true;
      this.chart.update();
    }, err => {
      console.log(err)
      return false;
    });
    //console.log(this.alkodata.getSizes(this.product.toString(), this.pdata))
  }

  onSizes(){
    this.sizelist = []
    this.pSize = '';
    this.sizelist= this.alkodata.getSizes(this.product.toString(), this.pdata)
    console.log('slist' + this.sizelist + '    string' + this.product.toString())
  }

  onProducts(){
    this.product = '';
  }
}
