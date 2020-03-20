import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

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
  error_msg4:boolean = false;
  dropdownList:any;
  selectedItems:any;
  dropdownSettings:any;


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(public formBuilder: FormBuilder,public _dataService:DataService,public http: HttpClient,public router: Router, public cd: ChangeDetectorRef,public _location: Location) { 
    this.selectedElement= [1];
  }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      title_ar: ['',[Validators.required]],
      description: ['',[Validators.required]],
      description_ar: ['',[Validators.required]],
      image:[''],
      brandId: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      userId: ['', [Validators.required]]
    });

    this._dataService.getCountries();
    this._dataService.getBrandsList();
    // this._dataService.getUsers();
    $('#notification_sidebar').addClass('active');

    

    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Users",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };
  }
  onItemSelect(item:any){
    
    item = item.id
    // console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    // console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
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
  getUsersByCountry(){
    // this.addFilterForm.patchValue({userId:[]})
    this._dataService.getUsersByCountry(this.addFilterForm.value.countryId)
  }
  getCountriesByBrand(){
    this._dataService.counpon_countries = []
    if (this.addFilterForm.value.brandId != ""){
      this._dataService.getCountriesByBrand(this.addFilterForm.value.brandId)      
    }
    else{
      this._dataService.countries_by_brand =[]
    }
  }

  onSubmit() {
    this.submitted = true;


    if (this.addFilterForm.value.title.replace(/\s/g,"") == ""){
      this.addFilterForm.value.title= ""
      this.error_msg = true;
      this.touched = this.addFilterForm.controls.title.touched
      console.log(this.addFilterForm.controls.title.touched)
      return
    }else{this.error_msg = false;}


    if (this.addFilterForm.value.title_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.title_ar= ""
      this.error_msg2 = true
      this.touched = this.addFilterForm.controls.title_ar.touched
      return
    }else{this.error_msg2 = false;}

    if (this.addFilterForm.value.description.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.description= ""
      this.error_msg3 = true
      this.touched = this.addFilterForm.controls.description.touched
      return
    }else{this.error_msg3 = false;}

    if (this.addFilterForm.value.description_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.description_ar= ""
      this.error_msg4 = true
      this.touched = this.addFilterForm.controls.description_ar.touched
      return
    }else{this.error_msg4 = false;}


    

    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
    
    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "notifications");
    this.customData=this.addFilterForm.value;
    this.customData['profile_pic']=this.filePreview;
    this.customData['is_file']= this.is_file;
    debugger
    var arr = this.customData.userId
    this.customData.userId = []
    for(var i=0; i < arr.length; i++){ console.log(arr[i].id); this.customData.userId.push(arr[i].id)}
    this._dataService.sendNotification(this.customData, formData);


  }


}
