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
  matched: boolean = false;


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
    this.alreadyUsed = false;

    if(!this.validateService.validateRegister({user: user})){
      console.log(user)
      return false
    }

    if(this.email != null && this.email != '' && !this.validateService.validateEmail({user: user})){
      this.emailWrong = true;
      return false;
    }else{
      this.emailWrong = false;
    }

    //TODO This is just bad. Should be factored in registerUser and the response should include the reason for false as already registered.
    //None the less works
    this.validateService.validateUsernameAndEmail({user: user}).subscribe(data => {
      this.matched = (data as any).body.success
      if(!this.matched){
        this.alreadyUsed = true;
        return false;
      }else {
        this.alreadyUsed = false;
        this.authService.registerUser(user).subscribe(data => {

          if((data as any).body.success){
            console.log('Register success')
            this.router.navigate(['/login'])
          }else{
            console.log('Register fail')
            this.router.navigate(['/register'])
          }
        });
        return true;
      }
      return;
    })








    return;
  }





}
