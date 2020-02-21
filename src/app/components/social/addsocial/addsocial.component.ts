import { Component, OnInit , ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-addsocial',
  templateUrl: './addsocial.component.html',
  styleUrls: ['./addsocial.component.css']
})
export class AddsocialComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  is_file:boolean = false;

  error_msg:boolean = false;
  touched:boolean;
  error_msg2:boolean = false;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  constructor(public formBuilder: FormBuilder,public _dataService:DataService,public http: HttpClient,public router: Router, public cd: ChangeDetectorRef,public _location: Location ) { }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      url: ['',[Validators.required]]
    });
  }
  get f() { return this.addFilterForm.controls; }

  backClicked() {
    this._location.back();
  }

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
    
    if (this.addFilterForm.value.name.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.name= ""
      this.error_msg = true;
      this.touched = this.addFilterForm.controls.name.touched
      return
    }else{this.error_msg = false;}


    if (this.addFilterForm.value.url.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.url= ""
      this.error_msg2 = true
      this.touched = this.addFilterForm.controls.url.touched
      return
    }else{this.error_msg2 = false;}



    

   if (this.addFilterForm.value.url != ""){
     
     const a = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
     
     let is_match = this.addFilterForm.value.url.match(a);

    if (is_match == null){
      alert("Enter valid social url")
      return
    }

   }

    let formData = new FormData();
    this.customData=this.addFilterForm.value;
    this.customData['is_file']= this.is_file;
  
    this._dataService.addSocial(this.customData);

  }

}