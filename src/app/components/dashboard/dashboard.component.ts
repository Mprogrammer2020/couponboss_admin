import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
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

  constructor(private _loginService: DataService) {
    this.logintoken = localStorage.getItem('login_token');

    this._loginService.dashboard();
   }

  ngOnInit() {
  
  }

}
