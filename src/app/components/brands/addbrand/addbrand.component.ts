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


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(private formBuilder: FormBuilder,private _dataService:DataService,private http: HttpClient,private router: Router, private cd: ChangeDetectorRef,private _location: Location ) { }

  ngOnInit() {

    this.addFilterForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      website_url: ['',[Validators.required]],
      logo:[''],
      country: ['', [Validators.required]]
    });

    this._dataService.getCountries(1,2);
  }

  get f() { return this.addFilterForm.controls; }

  backClicked() {
    this._location.back();
  }


  // onFileChange(event) {
  //   // const reader = new FileReader();
 
  //   // if(event.target.files && event.target.files.length) {
  //   //   const [file] = event.target.files;
  //   //   reader.readAsDataURL(file);
  
  //   //   reader.onload = () => {
  //   //     this.addFilterForm.patchValue({
  //   //       logo: reader.result
  //   //    });
      
  //   //     // need to run CD since file load runs outside of zone
  //   //     this.cd.markForCheck();
  //   //   };
  //   // }

  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];

  //   const formData = new FormData();
  //   formData.append('file', file);
  //     this.addFilterForm.patchValue({
  //             logo: file
  //          });
  //     // this.uploadForm.get('profile').setValue(file);
  //   }
  // }

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
