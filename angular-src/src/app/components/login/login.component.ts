import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: String;
  password!: String;

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log((data as any).body.success)
      if((data as any).body.success){
        console.log('Register success')
        console.log(data)
        this.authService.storeUserData((data as any).body.token, (data as any).body.user)
        this.router.navigate(['/dashboard'])
      }else{
        console.log('Register fail')
        this.router.navigate(['/register'])
      }
    });


  }

}
