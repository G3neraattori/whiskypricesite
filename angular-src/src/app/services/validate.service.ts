import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";
const ngUrl = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private http:HttpClient) { }

  validateRegister({user}: { user: any }){
    return !(user.username == undefined || user.password == undefined);
  }

  validateEmail({user}: { user: any }){
    return String(user.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validateUsernameAndEmail({user}: { user: any }){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    //let success = null;
    let details = {
      username: user.username,
      password: user.email,
    }

    return this.http.post(ngUrl + '/users/username', details,{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<Object>) => res))

  }
}
