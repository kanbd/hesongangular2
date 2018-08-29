import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers:[PostsService]
})
export class PostsComponent implements OnInit {
  showcom:Boolean=false;
  editpost:Boolean=false;
  posts:any=[];
  edpost:any={};
  comments:any=[];
  curcmd:any;
  curid:any;
  showcomid:any;
  showListid:any;
  commentbody:String;
  // filterBy:any;
  postSubscription:any;
  commSubscription:any;
  // subcommon=new Subject<any>();
  constructor(private _postsservice:PostsService,private _cookieservice:CookieService) { }

  ngOnInit() {
      this.postSubscription=this._postsservice.getPosts().subscribe((data)=>{
        // console.log(data);
        console.log(data);
        this.posts=data;
      });
  }
  

  ngOnDestroy(){
    this.postSubscription.unsubscribe();

  }
  
  showcommon(id){
    this.getcommon(id);
    if(id!=this.showcomid){
     this.showcomid=id;
    }else{
      this.showcomid=null;
    }
     
  }
  getcommon(id){
    this._postsservice.getComments(id).subscribe((data)=>{
      this.posts.filter(x=>x._id==id)[0]["comments"]=data;
      console.log(this.posts.filter(x=>x._id==id)[0]["comments"]);
      // this.subcommon.next(true);
    });
  }
  liked(id){
    var like={};
    like["name"]=this._cookieservice.get('curUser');
    like["id"]=id;
    var likedlist=this.posts.filter(x=>x._id===id)[0]["liked_users"];
    if(likedlist==undefined||likedlist==null){
      likedlist=new Array();
    }
    if(likedlist.indexOf(like["name"]) > -1){
      console.log("contains");
    }else{
      console.log(like["name"]);
      this.posts.filter(x=>x._id===id)[0]["liked_users"].push(like["name"]);
      console.log(likedlist);
    }
      
    this._postsservice.click_like(like);
    this.posts.filter(x=>x._id==id)[0]["psot_like"]=this.posts.filter(x=>x._id==id)[0]["psot_like"]+1;
    //console.log(this.posts.filter(x=>x._id===id)[0]);
  }
  editpostFn(id){
    //this.editpost=!this.editpost;
    if(this.curid!=id){
      this.curid=id;
      this.edpost["title"]=this.posts.filter(x=>x._id==id)[0]["post_title"];
      this.edpost["description"]=this.posts.filter(x=>x._id==id)[0]["post_description"];
    }else{
      this.curid=null;
    }
  }
  submitedit(id){
    this.edpost['id']=id;
    this._postsservice.edit_post(this.edpost);
    this.posts.filter(x=>x._id==id)[0]["post_title"]=this.edpost["title"];
    this.posts.filter(x=>x._id==id)[0]["post_description"]=this.edpost["description"];
    this.curid=null;

  }
  delete(id){
    this.posts.splice(this.posts.filter(x=>x._id==id),1);
    this._postsservice.delete(id);
  }
  showusersFn(id){
    if(this.showListid!=id){
      this.showListid=id;
      
    }else{
      this.showListid=null;
    }
  }
  addcommentFn(id){
    if(this.curcmd!=id){
      this.commentbody=null;
      this.curcmd=id;
    }else{
      this.curcmd=null;
    }
  }
  submitComment(id){
    var comment={};
    comment["postid"]=id;
    comment["body"]=this.commentbody;
    this._postsservice.postComment(comment).subscribe((data)=>{
      this.showcomid=id;
      this.getcommon(id);
      this.curcmd=null;
    });
  }
}
