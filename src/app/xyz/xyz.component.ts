import { Component, OnInit } from '@angular/core';
import { XyzService } from '../xyz.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {

  public user: any;
  public logintoken: string;
 
  constructor(private _xyzService: XyzService) { }
 
  ngOnInit() {
    this.logintoken = localStorage.getItem('login_token')
    this.user = {
      username: '',
      password: '',
    };
  }

 
  login() {
    this._xyzService.login({'email': this.user.username, 'password': this.user.password, "device_id": "1546541xcfdf4521", "deviceType": "a"});

  }
 
  refreshToken() {
    this._xyzService.refreshToken();
  }
 
  logout() {
    localStorage.clear();
    this._xyzService.logout();
  }

  test(){

    console.log("_xyzService.token")
    console.log(this._xyzService.tok_data)
  }
}
