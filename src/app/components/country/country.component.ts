import { Component, OnInit, Inject } from '@angular/core';import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { DOCUMENT } from '@angular/common';
import {Location} from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page
  current_location:any;
  image:any

  dtOptions: DataTables.Settings = {};

  constructor(@Inject(DOCUMENT) public document: Document, public _dataService: DataService ,public router: Router,public _location: Location) { }

  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    // this.current_location = this.document.location.origin;
    this.current_location = "http://157.245.218.104:8000";
    this._dataService.getCountries();
    $('#country_sidebar').addClass('active');

    console.log(this.current_location)
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.loadscript();

  }
  

  public loadscript()
  {
    
  $(document).ready(function(){
    // $("#myInput").on("keyup", function() {
    //   var value = $(this).val().toLowerCase();
    //   $("#myTable tr").filter(function() {
    //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //   });
    // });
  });

  }

  



  public deleteCountry(id){
    let a = confirm("Are you Sure you want to delete this country ?")
    if (a == true){
    this._dataService.deleteCountry({"id": id})
    }
  }

}
