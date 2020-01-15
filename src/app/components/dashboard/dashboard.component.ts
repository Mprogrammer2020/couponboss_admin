import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from '../../services/login.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public logintoken: any;
  public data: any;

  constructor(private _loginService: LoginService) {
    this.logintoken = localStorage.getItem('login_token');
   }

  ngOnInit() {
    this.data = {
      coupons_added: '',
      coupons_used: '',
    };

    this._loginService.dashboard();
    this.set_data()
  }

    set_data(){
      this.data.coupons_added = this._loginService.data.total_coupons
      this.data.coupons_used = this._loginService.data.total_used_copons
    }
}
