import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  selectedElement:any;
  is_file:boolean = false;

  error_msg:boolean = false;
  touched:boolean;
  error_msg2:boolean = false;
  error_msg3:boolean = false;

  constructor(private formBuilder: FormBuilder,private _dataService:DataService,private http: HttpClient,private router: Router, private cd: ChangeDetectorRef,private _location: Location) { 
     }

  ngOnInit() {

    this.addFilterForm = this.formBuilder.group({
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      image:['']
    });

    this._dataService.getAdminProfile();
    console.log("hello")
    console.log(this._dataService.currentadmin)
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
    
    if (this.addFilterForm.value.first_name.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.first_name= ""
      this.error_msg = true;
      this.touched = this.addFilterForm.controls.first_name.touched
      return
    }else{this.error_msg = false;}


    if (this.addFilterForm.value.last_name.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.last_name= ""
      this.error_msg2 = true
      this.touched = this.addFilterForm.controls.last_name.touched
      return
    }else{this.error_msg2 = false;}

    if (this.addFilterForm.value.email.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.email= ""
      this.error_msg2 = true
      this.touched = this.addFilterForm.controls.email.touched
      return
    }else{this.error_msg2 = false;}
  
    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }

    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "userprofile");
    this.customData=this.addFilterForm.value;
    this.customData['is_file']= this.is_file;
  
    this._dataService.updateAdminProfile(this.customData, formData);

  }

}
