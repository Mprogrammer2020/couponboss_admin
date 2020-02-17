import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  current_location:string;
  constructor(private _dataService: DataService) {this._dataService.getAdminProfile();this.current_location = "http://192.168.2.91:8001"; }

  ngOnInit() {
  
  }


  logout() {
    let a = confirm("Are you Sure you want to logout?")
    if (a == true){
    localStorage.clear();
    window.location.href = ''
    }
  }

}
