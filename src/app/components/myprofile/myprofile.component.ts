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

  constructor(private _dataService: DataService ,private router: Router) { this._dataService.getAdminProfile();}

  ngOnInit() {
  }

}
