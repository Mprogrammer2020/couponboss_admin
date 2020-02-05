import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  
  private currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page
  current_location:any
  constructor(private _dataService: DataService,private router: Router) {}
  ngOnInit() {
    this.current_location = "http://192.168.2.57:8000";
    this.getData(this.currentPage,this.itemsPerPage)
    $('#brand_sidebar').addClass('active');

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
