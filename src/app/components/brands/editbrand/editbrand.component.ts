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

  

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient,private router: Router,private _Activatedroute:ActivatedRoute,private _dataService:DataService,private _location: Location) { 
    this.selectedId=this._Activatedroute.snapshot.paramMap.get("id");
    this._dataService.getBrand(this.selectedId);

      this.selectedElement= [1,2];
  }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      website_url: ['',[Validators.required]],
      logo:[''],
      country: ['', [Validators.required]],
      brandId:this.selectedId
    });

    this._dataService.getCountries(1,2);
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
