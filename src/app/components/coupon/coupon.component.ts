import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  private currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page
  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  constructor(private formBuilder: FormBuilder, private _dataService: DataService,private router: Router) { }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      brand: '',
      country:''
    });

    this.getData(this.currentPage,this.itemsPerPage)
    $('#coupon_sidebar').addClass('active');
    this._dataService.getBrandsList(1,2)
    this._dataService.getCountries(1,2)
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
    
    this._dataService.getCoupons(pageNo,maxResults);
}


  public editCoupon(id){
    this.router.navigate(['coupon/edit/'+id]);
  }

  public deleteCoupon(id){
    this._dataService.deleteCoupon({"id": id})
  }

  public ViewCoupon(id){
    this.router.navigate(['/coupon-detail/'+id]);
  }

  public filterCoupon()
  {
    var data = this.addFilterForm.value;
    this._dataService.filterCoupon(data)

  }

  public changeCity(event){
    var data = this.addFilterForm.value;
    this._dataService.filterCoupon(data)
  }

}
