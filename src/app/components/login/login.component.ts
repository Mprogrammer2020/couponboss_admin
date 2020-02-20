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
  public error_msg:boolean = false;
  public emailerror_msg:boolean = false;
  public passerror_msg:boolean = false;

  constructor(public auth: DataService,public _loginService: LoginService, public router: Router) {}
 
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
    if (this.user.username == "" && this.user.password == ""){
      this.error_msg = true
      this.passerror_msg = false
      this.emailerror_msg = false
      return 
    }
    if (this.user.username == "" ){
      this.emailerror_msg = true
      this.error_msg = false
      this.passerror_msg = false
      return 
    }
    if (this.user.password == "" ){
      this.passerror_msg = true
      this.emailerror_msg = false
      this.error_msg = false
      return 
    }


    this.passerror_msg = false
    this.emailerror_msg = false
    this.error_msg = false
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
