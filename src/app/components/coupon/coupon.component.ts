import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  constructor(private _dataService: DataService,private router: Router) {this._dataService.getCoupons(); }

  ngOnInit() {
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

}
