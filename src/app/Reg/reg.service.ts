import { Injectable ,OnInit} from '@angular/core';
import {Router}from '@angular/router';
import {Subject,BehaviorSubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegService {

  constructor(private _router:Router,private _cookieservice:CookieService,private _http:HttpClient) { }
  signup(credentials){
    console.log(credentials);
    this._http.post('http://localhost:3000/signup',credentials).subscribe((data:any)=>{
      if(data.isSignUp){
        this._router.navigate(["/login"]);
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
}
