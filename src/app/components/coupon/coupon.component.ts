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

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  constructor(private formBuilder: FormBuilder, private _dataService: DataService,private router: Router) {this._dataService.getCoupons(); }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      brand: '',
      country:''
    });
    this._dataService.getBrandsList()
    this._dataService.getCountries()
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
