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

  current_location:any
  constructor(private _dataService: DataService,private router: Router) { this._dataService.getBrandsList();}
  ngOnInit() {
    this.current_location = "http://192.168.2.91:8001";

  }

  public editBrand(id){
    this.router.navigate(['/editbrand/'+id]);
  }

  public deleteBrand(id){
   let a = confirm("Are you Sure?")
   if (a == true){
    this._dataService.deleteBrand({"brandId": id})
   }
  }

}
