import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  current_location:string;
  constructor(public _dataService: DataService ,public router: Router) { this._dataService.getAdminProfile();   this.current_location = "http://159.89.49.231:8000";}

  ngOnInit() {
  }

}
