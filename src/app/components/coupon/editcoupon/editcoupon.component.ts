import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editcoupon',
  templateUrl: './editcoupon.component.html',
  styleUrls: ['./editcoupon.component.css']
})
export class EditcouponComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  selectedId:any;
  selectedElement:any;
  is_file:boolean = false;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  constructor(public formBuilder: FormBuilder,public httpClient: HttpClient,public router: Router,public _Activatedroute:ActivatedRoute,public _dataService:DataService) { 
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    this._dataService.getCoupon(this.selectedId);
    this.selectedElement= [1,2]
  }
  
  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      headline: ['',[Validators.required]],
      code:['',[Validators.required]],
      discount:['',[Validators.required]],
      description:['',[Validators.required]],
      store_link:['',[Validators.required]],
      video_link:['',[Validators.required]],
      logo:[''],
      is_featured:['',[Validators.required]],
      country: ['', [Validators.required]],
      brand:['',[Validators.required]],
      coupon_id:this.selectedId
    });

    this._dataService.getCountries(1,2);
    this._dataService.getBrandsList(1,2);
  }
  get f() { return this.addFilterForm.controls; }

  onFileChange(event:any) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.filePreview = file;
      this.is_file = true
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
    
    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "coupon");
    this.customData=this.addFilterForm.value;
    this.customData['is_file']= this.is_file;
    this._dataService.editCoupon(this.customData, formData);


  }

}
