import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, pipe} from "rxjs";
const ngUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AlkodataService {

  constructor(private http:HttpClient

              ) { }

  getData(search: any){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(ngUrl + '/data/products', search, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<Object>) => res));
  }

  getLabels(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get(ngUrl + '/data/allproducts', {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<Object>) => res));
  }

  getSizes(pname: string, pdata: any){
    let arr: any[] = [];

    for(let i=0; i<pdata[0].products.length; i++){
      if(!arr.includes(pdata[0].products[i].bottleSize) && pdata[0].products[i].productName === pname){
        arr.push(pdata[0].products[i].bottleSize);
      }
    }

    return arr;
  }

}
