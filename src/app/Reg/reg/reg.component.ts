import { Component, OnInit,Input } from '@angular/core';
import {RegService} from '../reg.service';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  auths:any={};
  constructor(private _regservice:RegService) { }

  ngOnInit() {
  }
  signup(){
    this._regservice.signup(this.auths);
  }

}
