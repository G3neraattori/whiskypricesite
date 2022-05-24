import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlkodataService {

  constructor(private http:HttpClient

              ) { }

  getData(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get('http://localhost:3000/data/products', {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<Object>) => res));
  }
}
