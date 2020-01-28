import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-viewcoupon',
  templateUrl: './viewcoupon.component.html',
  styleUrls: ['./viewcoupon.component.css']
})
export class ViewcouponComponent implements OnInit {
  public selectedId:any;
  current_location:any
  constructor(private httpClient: HttpClient,private router: Router,private _Activatedroute:ActivatedRoute,private _dataService:DataService) { 
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    this._dataService.getCoupon(this.selectedId);
    this.current_location = "http://192.168.2.91:8001";
  }

  ngOnInit() {
  }

}
