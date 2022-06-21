import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  username!: String;
  email!: String;
  password!: String;
  emailWrong: boolean = false;
  alreadyUsed: boolean = false;


  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister({user: user})){
      console.log(user)
      return false
    }

    if(this.email != null && this.email != '' && !this.validateService.validateEmail({user: user})){
      this.emailWrong = true;
      return false;
    }

    if(!this.validateService.validateUsernameAndEmail({user: user})){
      this.alreadyUsed = true;
      return false;
    }



    this.authService.registerUser(user).subscribe(data => {
      console.log('Aksfjlkafjlajfslkfjasl' + (data as any).body.success)
      if((data as any).body.success){
        console.log('Register success')
        this.router.navigate(['/login'])
      }else{
        console.log('Register fail')
        this.router.navigate(['/register'])
      }
    });

    return;
  }

  elementRemove(el: any){

  }





}
