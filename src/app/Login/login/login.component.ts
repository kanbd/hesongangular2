import { Component, OnInit ,Input} from '@angular/core';

import {LoginService} from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auths:any={};
  constructor(private _loginService:LoginService) { }

  ngOnInit() {
  }
  loginFn(){
    this._loginService.loginFn(this.auths);
  }

}
