import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {LoginService} from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private _loginservice:LoginService, private _router:Router) { }
  canActivate():boolean{
    if(!this._loginservice.checkLogin()){
      this._router.navigate(['/login']);
      return false;
    }else
      return true;
  }
}
