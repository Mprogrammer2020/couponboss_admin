import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { DataTablesModule } from 'angular-datatables';



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  
  public currentPage:any=1; // set current page to 1
  public itemsPerPage:any=5; // we are showing 10 items per page
  current_location:any

  dtOptions: DataTables.Settings = {};

  constructor(public _dataService: DataService,public router: Router,public _location: Location) {}

  backClicked() {
    this._location.back();
  }


  ngOnInit() {
    this.current_location = "http://157.245.218.104:8000";
    this.getData(this.currentPage,this.itemsPerPage)
    $('#brand_sidebar').addClass('active');
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.loadscript();

  }
  public setValue() { 
    this.currentPage=1;
    this.getData(this.currentPage,this.itemsPerPage)
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

  public getNext(page: any){
    this.currentPage = page;
    this.getData(this.currentPage,this.itemsPerPage);
  }

  getData(pageNo: any,maxResults: any){
    
    this._dataService.getBrandsList(pageNo,maxResults);
}

  public editBrand(id){
    this.router.navigate(['/editbrand/'+id]);
  }

  public deleteBrand(id){
   let a = confirm("Are you Sure you want to delete this Brand ?")
   if (a == false){
    this.router.navigate(['brands']);
   }else{
    this._dataService.deleteBrand({"brandId": id});
   }
  }

  

}
