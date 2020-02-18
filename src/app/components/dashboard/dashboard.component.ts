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

  constructor(public _loginService: DataService, public router: Router) {
    this.logintoken = localStorage.getItem('token');

    this._loginService.dashboard();
   }

  ngOnInit() {

    $('#dashboard_sidebar').addClass('active');
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }

  }

}
