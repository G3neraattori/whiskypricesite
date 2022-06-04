import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { AlkodataService } from "../../services/alkodata.service";
import { BaseChartDirective} from "ng2-charts";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})


export class LineChartComponent implements OnInit{
  //Learned the hard way not to use the String vs string.
  //won't be fixed (atleast in the near future)
  product!: String;
  pSize!: String;
  ppl!: boolean;
  productlist: string[] = [];
  sizelist: string[] = [];
  min!: number;
  minDate!: string;
  max!: number;
  maxDate!: string;
  avg!: number;

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

  constructor(private alkodata: AlkodataService,
              public authService: AuthService) {
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
      this.getExtraInfo();
    }, err => {
      console.log(err)
      return false;
    });
    //console.log(this.alkodata.getSizes(this.product.toString(), this.pdata))
  }

  getExtraInfo(){
    let arr: any[] = [];
    //TODO make this take the first value and compare to that
    this.min = 99999999;
    this.minDate = '';
    this.max = -9999999;
    this.maxDate = '';
    this.avg = 0;
    let total = 0;


    for(let i=0; i<this.adata.length; i++){

      if(this.min > this.adata[i].products[0].price){
        this.min = this.adata[i].products[0].price
        this.minDate = this.adata[i].date
      }

      if(this.max < this.adata[i].products[0].price){
        this.max = this.adata[i].products[0].price
        this.maxDate = this.adata[i].date
      }

      total += parseFloat(this.adata[i].products[0].price);
      this.avg = parseFloat((total/(i+1)).toFixed(2));
    }

    return;
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

  onSave(){
    console.log(this.product.toString() + this.pSize.toString())
    this.authService.saveProduct(this.product.toString(), this.pSize.toString()).subscribe(data => {
      //console.log((data as any).body.success)
      if((data as any).body.success) {
        console.log('Data saved successfully')
        console.log(data)
      }else {
        console.log('Data saved unsuccessfully')
      }
    });
  }
}
