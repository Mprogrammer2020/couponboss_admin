import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  public currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page
  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  dtOptions: DataTables.Settings = {};

  constructor(public formBuilder: FormBuilder, public _dataService: DataService,public router: Router) { }

  
  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      brand: '',
      country:''
    });

    this._dataService.getCoupons();
    $('#coupon_sidebar').addClass('active');
    this._dataService.getBrandsList()
    this._dataService.getCountries()
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

  

  


  public editCoupon(id){
    this.router.navigate(['coupon/edit/'+id]);
  }

  public deleteCoupon(id){
    let a = confirm("Are you Sure you want to delete this Coupon ?")
    if (a == false){
      this.router.navigate(['coupon']);
    }else{
    this._dataService.deleteCoupon({"id": id})
    }
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
