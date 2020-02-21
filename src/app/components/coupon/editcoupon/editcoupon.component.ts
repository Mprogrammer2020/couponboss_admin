import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

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

  error_msg:boolean = false;
  touched:boolean;
  error_msg2:boolean = false;
  error_msg3:boolean = false;
  error_msg4:boolean = false;
  error_msg5:boolean = false;
  error_msg6:boolean = false;
  error_msg7:boolean = false;
  min;
  

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  constructor(public formBuilder: FormBuilder,public httpClient: HttpClient,public router: Router,public _Activatedroute:ActivatedRoute,public _dataService:DataService,public _location: Location) { 
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

  backClicked() {
    this._location.back();
  }

  onSubmit() {
    this.submitted = true;
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");

    if (this.addFilterForm.value.title.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.title= ""
      this.error_msg = true;
      this.touched = this.addFilterForm.controls.title.touched
      return
    }else{this.error_msg = false;}

    if (this.addFilterForm.value.headline.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.headline= ""
      this.error_msg2 = true;
      this.touched = this.addFilterForm.controls.headline.touched
      return
    }else{this.error_msg2 = false;}

    if (this.addFilterForm.value.code.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.code= ""
      this.error_msg3 = true;
      this.touched = this.addFilterForm.controls.code.touched
      return
    }else{this.error_msg3 = false;}


    if (this.addFilterForm.value.discount == null){
     
      // this.addFilterForm.value.discount= ""
      this.error_msg4 = true;
      this.touched = this.addFilterForm.controls.discount.touched
      return
    }else{this.error_msg4 = false;}

    if (this.addFilterForm.value.description.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.description= ""
      this.error_msg5 = true;
      this.touched = this.addFilterForm.controls.description.touched
      return
    }else{this.error_msg5 = false;}

    if (this.addFilterForm.value.store_link.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.store_link= ""
      this.error_msg6 = true;
      this.touched = this.addFilterForm.controls.store_link.touched
      return
    }else{this.error_msg6 = false;}

    if (this.addFilterForm.value.video_link.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.video_link= ""
      this.error_msg7 = true;
      this.touched = this.addFilterForm.controls.video_link.touched
      return
    }else{this.error_msg7 = false;}
    
    if (this.addFilterForm.value.store_link != ""){
     
      //const a = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
      const a = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})?$/g;
      let is_match = this.addFilterForm.value.store_link.match(a);
 
     if (is_match == null){
       alert("Enter valid store link")
       return
     }
 
    }

    if (this.addFilterForm.value.video_link != ""){
     
      //const a = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
        const a = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})?$/g;
      let is_match = this.addFilterForm.value.video_link.match(a);
 
     if (is_match == null){
       alert("Enter valid video link")
       return
     }
 
    }
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
