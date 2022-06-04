import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {AlkodataService} from "../../services/alkodata.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-chart-drawer',
  templateUrl: './chart-drawer.component.html',
  styleUrls: ['./chart-drawer.component.css']
})
export class ChartDrawerComponent implements OnInit {

  product!: String;
  pSize!: String;
  ppl!: boolean;
  savedList: any[] = [];
  selectedList:any[]=[];
  minP!: number;
  maxP!: number;
  minD!: string;
  maxD!: string;
  avg!: number;
  holder!: any;

  //Some black magic that makes the chart updates possible
  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;
  adata!: any
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
    this.authService.loadProducts().subscribe(data => {
      this.savedList = (data as any).body.user
      console.log(this.savedList)
    });

  }

  //this is bad way to do this. Maybe use this component in linechart component (aka search). Requires way too much rewriting thou
  updateMe(product: string, size: string){
    let total = 0;
    this.minD = ""
    this.maxP = -999999999
    this.maxD = ""
    this.minP = 999999999
    this.avg = 0;

    const search = {
      productName: product,
      bottleSize: size
    }

    console.log(search)

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
      console.log(this.lineChartData.datasets[0].data)
      this.lineChartData.datasets[0].label = product
      this.lineChartLegend = true;
      this.chart.update();
      //this.getExtraInfo();
      for(let i=0; i<this.adata.length; i++){

        if(this.minP > this.adata[i].products[0].price){
          this.minP = this.adata[i].products[0].price
          this.minD = this.adata[i].date
        }

        if(this.maxP < this.adata[i].products[0].price){
          this.maxP = this.adata[i].products[0].price
          this.maxD = this.adata[i].date
        }

        total += parseFloat(this.adata[i].products[0].price);
        this.avg = parseFloat((total/(i+1)).toFixed(2));
      }
    }, err => {
      console.log(err)
      return false;
    });



    return;
  }

  listClick(item: any){
    this.holder = item;
    this.updateMe(item.pname, item.psize)
  }

  removeSaved(pname: string, psize: string){
    //console.log('asfafa' + pname)
    this.authService.removeProducts(pname, psize).subscribe(data => {
      this.savedList = (data as any).body.user
      this.savedList = [];
      this.ngOnInit()
      console.log(this.savedList)
    });


  }



}
