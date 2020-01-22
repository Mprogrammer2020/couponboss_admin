import { Component, OnInit } from '@angular/core';import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(private _dataService: DataService ,private router: Router) { this._dataService.getCountries();}

  ngOnInit() {
  }
  public deleteCountry(id){
    this._dataService.deleteCountry({"id": id})
  }

}
