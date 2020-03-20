import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
// import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from  'rxjs';


@Component({
  selector: 'app-editbrand',
  templateUrl: './editbrand.component.html',
  styleUrls: ['./editbrand.component.css']
})
export class EditbrandComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: any;
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
  dropdownList:any;
  selectedItems:any;
  dropdownSettings:any;

  

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

  constructor(public formBuilder: FormBuilder,public httpClient: HttpClient,public router: Router,public _Activatedroute:ActivatedRoute,public _dataService:DataService,public _location: Location) { 
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    this._dataService.getBrand(this.selectedId);

      this.selectedElement= [1,2];
  }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      name_ar: ['',[Validators.required]],
      website_url: ['',[Validators.required]],
      logo:[''],
      country: ['', [Validators.required]],
      discription:[''],
      discription_ar:[''],
      brandId:this.selectedId
    });

    this._dataService.getCountries();
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Countries",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    }; 
  }

  onItemSelect(item:any){
    console.log(item);
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

  backClicked() {
    this._location.back();
  }

  get f() { return this.addFilterForm.controls; }

  onFileChange(event:any) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.filePreview = file;
      this.is_file = true
      reader.readAsDataURL(file);
      // reader.onload = () => {
      //    this.myString=(<string> reader.result).split(',')[1];
      //   this.fileName = file.name + " " + file.type;
      //   this.filePreview = 'data:image/png' + ';base64,' + this.myString;
      //   $('#viewProfileImage').attr("src", this.filePreview);


      // };
    }
  }

  

  onSubmit() {
    this.submitted = true;    
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");

       
    if (this.addFilterForm.value.name.replace(/\s/g,"") == ""){
      this.addFilterForm.value.name= ""
      this.error_msg = true;
      this.touched = this.addFilterForm.controls.name.touched
      console.log(this.addFilterForm.controls.name.touched)
      return
    }else{this.error_msg = false;}

    if (this.addFilterForm.value.name_ar.replace(/\s/g,"") == ""){
      this.addFilterForm.value.name_ar= ""
      this.error_msg3 = true;
      this.touched = this.addFilterForm.controls.name_ar.touched
      console.log(this.addFilterForm.controls.name_ar.touched)
      return
    }else{this.error_msg3 = false;}

    if (this.addFilterForm.value.discription.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.discription= ""
      this.error_msg4 = true
      this.touched = this.addFilterForm.controls.discription.touched
      return
    }else{this.error_msg4 = false;}


    if (this.addFilterForm.value.discription_ar.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.discription_ar= ""
      this.error_msg5 = true
      this.touched = this.addFilterForm.controls.discription_ar.touched
      return
    }else{this.error_msg5 = false;}


    if (this.addFilterForm.value.website_url.replace(/\s/g,"") == ""){
     
      this.addFilterForm.value.website_url= ""
      this.error_msg2 = true
      this.touched = this.addFilterForm.controls.website_url.touched
      return
    }else{this.error_msg2 = false;}



   if (this.addFilterForm.value.website_url != ""){
     
    //  const a = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    const a = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})?$/g;
     
     let is_match = this.addFilterForm.value.website_url.match(a);

    if (is_match == null){
      alert("Enter valid website url")
      return
    }

   }


    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
  
    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "brand");
    this.customData=this.addFilterForm.value;
    this.customData['is_file']= this.is_file;
    this._dataService.editBrand(this.customData, formData);

  }

}
