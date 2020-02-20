import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.css']
})
export class AddbrandComponent implements OnInit {

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
      website_url: ['',[Validators.required]],
      logo: ['',[Validators.required]],
      country: ['', [Validators.required]]
    });

    this._dataService.getCountries(1,2);
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


    if (this.addFilterForm.value.website_url.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.website_url= ""
      this.error_msg2 = true
      this.touched = this.addFilterForm.controls.website_url.touched
      return
    }else{this.error_msg2 = false;}
  
    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }

    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "brand");
    this.customData=this.addFilterForm.value;
    this.customData['is_file']= this.is_file;
  
    this._dataService.addBrand(this.customData, formData);

  }

}
