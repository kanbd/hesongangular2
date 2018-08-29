import { Component, OnInit } from '@angular/core';

import {LoginService} from '../../Login/login.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn:boolean=false;

  constructor(private _loginService:LoginService) { 
   
  }

  ngOnInit() {
    this.isLoggedIn=this._loginService.checkLogin()!=null&&this._loginService.checkLogin()!="";
    console.log(this._loginService.checkLogin());
    this._loginService.subname.subscribe((data) => { 
      console.log(data);
      this.isLoggedIn=data;
     });
  }
  logout(){
    this._loginService.logout();
  }

}
