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
  error_msg8:boolean = false;
  error_msg9:boolean = false;
  error_msg10:boolean = false;
  error_msg11:boolean = false;
  error_msg12:boolean = false;
  error_msg13:boolean = false;
  error_msg14:boolean = false;
  min;

  image_error:boolean = false;
  

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  constructor(public formBuilder: FormBuilder,public httpClient: HttpClient,public router: Router,public _Activatedroute:ActivatedRoute,public _dataService:DataService,public _location: Location) { 
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    this._dataService.getCoupon(this.selectedId);
    this.selectedElement= [1,2]
  }
  
  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      title_ar: ['',[Validators.required]],
      headline: ['',[Validators.required]],
      headline_ar: ['',[Validators.required]],
      code:['',[Validators.required]],
      code_ar:['',[Validators.required]],
      discount:['',[Validators.required]],
      discount_ar:['',[Validators.required]],
      description:['',[Validators.required]],
      description_ar:['',[Validators.required]],
      store_link:['',[Validators.required]],
      store_link_ar:['',[Validators.required]],
      video_link:['',[Validators.required]],
      video_link_ar:['',[Validators.required]],
      logo:[''],
      is_featured:['',[Validators.required]],
      country: ['', [Validators.required]],
      brand:['',[Validators.required]],
      expiry_date:['',[Validators.required]],
      coupon_id:this.selectedId
    });
    this.min =  new Date();

    this._dataService.getCountries();
    this._dataService.getBrandsList();
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

    if (this.addFilterForm.value.title_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.title_ar= ""
      this.error_msg2 = true;
      this.touched = this.addFilterForm.controls.title_ar.touched
      return
    }else{this.error_msg2 = false;}

    if (this.addFilterForm.value.headline.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.headline= ""
      this.error_msg3 = true;
      this.touched = this.addFilterForm.controls.headline.touched
      return
    }else{this.error_msg3 = false;}

    if (this.addFilterForm.value.headline_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.headline_ar= ""
      this.error_msg4 = true;
      this.touched = this.addFilterForm.controls.headline_ar.touched
      return
    }else{this.error_msg4 = false;}

    if (this.addFilterForm.value.code.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.code= ""
      this.error_msg5 = true;
      this.touched = this.addFilterForm.controls.code.touched
      return
    }else{this.error_msg5 = false;}

    if (this.addFilterForm.value.code_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.code_ar= ""
      this.error_msg6 = true;
      this.touched = this.addFilterForm.controls.code_ar.touched
      return
    }else{this.error_msg6 = false;}


    if (this.addFilterForm.value.discount == null){
     
      // this.addFilterForm.value.discount= ""
      this.error_msg7 = true;
      this.touched = this.addFilterForm.controls.discount.touched
      return
    }else{this.error_msg7 = false;}

    if (this.addFilterForm.value.discount_ar == null){
     
      // this.addFilterForm.value.discount= ""
      this.error_msg8 = true;
      this.touched = this.addFilterForm.controls.discount_ar.touched
      return
    }else{this.error_msg8 = false;}

    if (this.addFilterForm.value.description.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.description= ""
      this.error_msg9 = true;
      this.touched = this.addFilterForm.controls.description.touched
      return
    }else{this.error_msg9 = false;}

    if (this.addFilterForm.value.description_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.description_ar= ""
      this.error_msg10 = true;
      this.touched = this.addFilterForm.controls.description_ar.touched
      return
    }else{this.error_msg10 = false;}

    if (this.addFilterForm.value.store_link.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.store_link= ""
      this.error_msg11 = true;
      this.touched = this.addFilterForm.controls.store_link.touched
      return
    }else{this.error_msg11 = false;}

    if (this.addFilterForm.value.store_link_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.store_link_ar= ""
      this.error_msg12 = true;
      this.touched = this.addFilterForm.controls.store_link_ar.touched
      return
    }else{this.error_msg12 = false;}

    if (this.addFilterForm.value.video_link.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.video_link= ""
      this.error_msg13 = true;
      this.touched = this.addFilterForm.controls.video_link.touched
      return
    }else{this.error_msg13 = false;}

    if (this.addFilterForm.value.video_link_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.video_link_ar= ""
      this.error_msg14 = true;
      this.touched = this.addFilterForm.controls.video_link_ar.touched
      return
    }else{this.error_msg14 = false;}
    
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
        // const a = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})?$/g;
        const a = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g;
        let is_match = this.addFilterForm.value.video_link.match(a);
 
     if (is_match == null){
       alert("Enter valid video link")
       return
     }
 
    }

    if (!this.filePreview){
      this.image_error = true;
      return
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
