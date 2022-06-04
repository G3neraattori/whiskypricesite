import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JwtModule} from "@auth0/angular-jwt";
const ngUrl= 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  authToken!: any;
  user!: any;

  constructor(private http:HttpClient,
              public jwtHelper: JwtHelperService) { }

    registerUser(user: any){
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
      //let headers = new HttpHeaders();
      //headers.append('Consent-Type', 'application/json');
      return this.http.post(ngUrl + '/users/register',user, {
        headers: headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<Object>) => res));
      //return this.http.post(ngUrl + '/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));
    }

    authenticateUser(user: any){
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
      //headers.append('Consent-Type', 'application/json');
      return this.http.post(ngUrl + '/users/authenticate',user, {
        headers: headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<Object>) => res));
    }

    storeUserData(token: any, user: any){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user))
      this.authToken = token;
      this.user = user;
    }

    logout(){
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }

    getProfile(){
      this.loadToken();
      let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.authToken
      });
      return this.http.get(ngUrl + '/users/profile', {
        headers: headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<Object>) => res));
    }

    loadToken(){
      this.authToken = localStorage.getItem('id_token');
    }

    loggedIn(){
      return this.jwtHelper.isTokenExpired();
    }


    //TODO make these more optimized. Loading token every time seems unoptimized
    saveProduct(pname: string, psize: string){
      this.loadToken();
      let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.authToken
      });
      let saved = {
        pname: pname,
        psize: psize,
        remove: false
      }
      return this.http.post(ngUrl + '/users/usersave', saved,{
        headers: headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<Object>) => res));
    }
  //https://0f5d-2001-14ba-22f2-2500-cd1a-310-b75-643f.ngrok.io
  loadProducts(){
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken
    });

    return this.http.get(ngUrl + '/users/usersaved',{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<Object>) => res));
  }
  removeProducts(pname: string, psize: string){
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken
    });
    let saved = {
      pname: pname,
      psize: psize,
      remove: true
    }
    return this.http.post(ngUrl + '/users/usersave', saved,{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<Object>) => res));
  }

}
