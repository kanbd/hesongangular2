import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  subcomment=new Subject<boolean>();
  constructor(private _http:HttpClient) { }
  getPosts(){
    return this._http.get('http://localhost:3001/getposts');
  }
  getComments(id){
    //return this._http.get('http://localhost:3001/getcomments',id);
    console.log(id);
    var d={};
    d['id']=id;
    
    return this._http.post('http://localhost:3001/getcomments',d);
    // .subscribe((data:any)=>{
    //   console.log(data);
    //   // if(data.isLoggedIn){
    //      this.subcomment.next(data);
    //   //   this._cookieservice.set('token',data.token);
    //   //   this._cookieservice.set('curUser',credentials.username);
    //   //   this._router.navigate(["/home"]);
    //   // }
    // });
  }
  edit_post(post){
    this._http.post('http://localhost:3001/edit',post).subscribe((data)=>{
      console.log(data);
    });
  }
  click_like(like){
    this._http.post('http://localhost:3001/like',like).subscribe((data)=>{
      console.log(data);
    });
  }
  postComment(comment){
    return this._http.post('http://localhost:3001/comment',comment);
  }
  delete(id){
    var idbody={};
    idbody["id"]=id;
    console.log("delete");
    console.log(idbody);
    this._http.post('http://localhost:3001/delete',idbody).subscribe((data)=>{
      console.log(data);
    });
  }
}
