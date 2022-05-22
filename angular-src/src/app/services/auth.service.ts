import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  authToken!: any;
  user!: any;

  constructor(private http:HttpClient) { }

    registerUser(user: any){
      let headers = new HttpHeaders();
      headers.append('Consent-Type', 'application/json');
      console.log(user)
      return this.http.post('http://localhost:3000/users/register',user, {
        headers: headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<Object>) => res));
      //return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));
    }

}
