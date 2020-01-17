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

  constructor(private _dataService: DataService,private router: Router) { this._dataService.getBrandsList();}
  ngOnInit() {

  }

  public editBrand(id){
    this.router.navigate(['/editbrand/'+id]);
  }

  public deleteBrand(id){
    this._dataService.deleteBrand({"brandId": id})
  }

}
