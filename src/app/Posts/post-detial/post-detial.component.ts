import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';
import {ActivatedRoute,Router} from '@angular/router'
@Component({
  selector: 'app-post-detial',
  templateUrl: './post-detial.component.html',
  styleUrls: ['./post-detial.component.css']
})
export class PostDetialComponent implements OnInit {
  post:any={};
  postid:String;
  constructor(private _postservie:PostsService,private _activerouter:ActivatedRoute,private _router:Router) { 
    this._activerouter.params.subscribe((val)=>{
      this.postid=val.id;
      //console.log(this.productCode);
    });
  }

  ngOnInit() {
    this._postservie.getPosts().subscribe((data:any)=>{
      this.post=data.filter(x=>x._id==this.postid)[0];
    })
  }
  backFn(){
    this._router.navigate(['/posts']);
  }

}
