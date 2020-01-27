import { Component, OnInit, Inject } from '@angular/core';import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  current_location:any;
  image:any

  constructor(@Inject(DOCUMENT) private document: Document, private _dataService: DataService ,private router: Router) { this._dataService.getCountries();}

  ngOnInit() {
    // this.current_location = this.document.location.origin;
    this.current_location = "http://192.168.2.91:8001";

    console.log(this.current_location)
  }
  public deleteCountry(id){
    this._dataService.deleteCountry({"id": id})
  }

}
