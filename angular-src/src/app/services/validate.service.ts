import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister({user}: { user: any }){
    return !(user.username == undefined || user.password == undefined);
  }
}
