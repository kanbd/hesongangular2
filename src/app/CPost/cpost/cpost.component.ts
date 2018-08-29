import { Component, OnInit ,Input} from '@angular/core';
import {CpostService} from '../cpost.service';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-cpost',
  templateUrl: './cpost.component.html',
  styleUrls: ['./cpost.component.css'],
  providers:[CpostService]
})
export class CPostComponent implements OnInit {
  post:any={};
  constructor(private _cpost:CpostService,private _cookieservice:CookieService) { }

  ngOnInit() {
  }
  submit(){
    this.post['createBy']=this._cookieservice.get('curUser');
    this._cpost.submit(this.post);
  }
}
