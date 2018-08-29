import { Injectable ,OnInit} from '@angular/core';
import {Router}from '@angular/router';
import {Subject,BehaviorSubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  subname=new Subject<boolean>();
  constructor(private _router:Router,private _cookieservice:CookieService,private _http:HttpClient) { }
  loginFn(credentials){
    console.log(credentials);
    this._http.post('http://localhost:3000/authenticate',credentials).subscribe((data:any)=>{
      if(data.isLoggedIn){
        this.subname.next(true);
        this._cookieservice.set('token',data.token);
        this._cookieservice.set('curUser',credentials.username);
        this._router.navigate(["/home"]);
      }
    });
    // if(credentials.username=='admin'&&credentials.password=='admin'){
    //   console.log("you have been login");
    //   this.subname.next(true);
    //   this._cookieservice.set('isloggedIn','true');
    //   //console.log(this.subname);
    //   this._router.navigate(["/home"]);
    // }else{
    //   alert("not vaild user");
    // }
  }
  checkLogin(){
    return this._cookieservice.get("token");
  }

  logout(){
    this._cookieservice.delete("token");
    this._cookieservice.delete("curUser");
    this.subname.next(false);
    this._router.navigate(['/login']);
  }
  
  OnInit(){
  }
}
