import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-viewcoupon',
  templateUrl: './viewcoupon.component.html',
  styleUrls: ['./viewcoupon.component.css']
})
export class ViewcouponComponent implements OnInit {
  public selectedId:any;
  current_location:any
  constructor(public datepipe: DatePipe, public httpClient: HttpClient,public router: Router,public _Activatedroute:ActivatedRoute,public _dataService:DataService,public _location: Location) { 
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    this._dataService.getCoupon(this.selectedId);
    this.current_location = "http://159.89.49.231:8000";
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }


}
