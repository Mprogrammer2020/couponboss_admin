import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any;
  public logintoken: any;
  public apiresult: any;

  constructor(public auth: DataService,private _loginService: LoginService, public router: Router) {}
 
  ngOnInit() {
    this.user = {
      username: '',
      password: '',
    };
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }

 
  login() {
    this._loginService.login({'email': this.user.username, 'password': this.user.password, "device_id": "12452451215245", "deviceType": "a"});
  }
 
  refreshToken() {
    this._loginService.refreshToken();
  }
 
  logout() {
    
    localStorage.clear();
    this._loginService.logout();
  }

  test(){

    console.log("_loginService.token")
    // console.log(this._loginService.tok_data)
  }

}
