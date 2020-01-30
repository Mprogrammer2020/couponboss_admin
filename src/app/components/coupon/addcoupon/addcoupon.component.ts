import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.css']
})
export class AddcouponComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  is_file:boolean = false;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  constructor(private formBuilder: FormBuilder,private _dataService:DataService,private http: HttpClient,private router: Router, private cd: ChangeDetectorRef) { }

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
      brand:['',[Validators.required]]
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

    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "coupon");
    this.customData=this.addFilterForm.value;
    this.customData['is_file']= this.is_file;
  
    this._dataService.addCoupon(this.customData, formData);


  }

}
