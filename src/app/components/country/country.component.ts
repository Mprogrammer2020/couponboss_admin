import { Component, OnInit, Inject } from '@angular/core';import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { DOCUMENT } from '@angular/common';
import {Location} from '@angular/common';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  private currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page
  current_location:any;
  image:any

  constructor(@Inject(DOCUMENT) private document: Document, private _dataService: DataService ,private router: Router,private _location: Location) { }

  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    // this.current_location = this.document.location.origin;
    this.current_location = "http://192.168.2.91:8001";
    this.getData(this.currentPage,this.itemsPerPage)
    $('#country_sidebar').addClass('active');

    console.log(this.current_location)
  }
  public setValue() { 
    this.currentPage=1;
    this.getData(this.currentPage,this.itemsPerPage)
  }

  public getNext(page: any){
    this.currentPage = page;
    this.getData(this.currentPage,this.itemsPerPage);
  }

  getData(pageNo: any,maxResults: any){
    
    this._dataService.getCountries(pageNo,maxResults);
}

  public deleteCountry(id){
    let a = confirm("Are you Sure you want to delete this country ?")
    if (a == true){
    this._dataService.deleteCountry({"id": id})
    }
  }

}
