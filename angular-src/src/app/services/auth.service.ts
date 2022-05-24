import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JwtModule} from "@auth0/angular-jwt";


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
      return this.http.post('http://localhost:3000/users/register',user, {
        headers: headers,
        observe: 'response'
      }).pipe(map((res: HttpResponse<Object>) => res));
      //return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));
    }

    authenticateUser(user: any){
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
      //headers.append('Consent-Type', 'application/json');
      return this.http.post('http://localhost:3000/users/authenticate',user, {
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
      return this.http.get('http://localhost:3000/users/profile', {
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

}
