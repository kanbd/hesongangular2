import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CpostService {
  constructor(private _http:HttpClient,private _router:Router) { }
  submit(post){
    this._http.post('http://localhost:3001/post',post).subscribe((data:any)=>{
      if(data.isPosted){
        console.log("gogogo");
        this._router.navigate(["/posts"]);
      }
    });
  }
}
