import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(private formBuilder: FormBuilder,private _dataService:DataService,private http: HttpClient,private router: Router, private cd: ChangeDetectorRef) { 
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
    this._dataService.getUsers();

  }

  get f() { return this.addFilterForm.controls; }


  onFileChange(event:any) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
         this.myString=(<string> reader.result).split(',')[1];
        this.fileName = file.name + " " + file.type;
        this.filePreview = 'data:image/png' + ';base64,' + this.myString;
        $('#viewProfileImage').attr("src", this.filePreview);


      };
    }
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
  
    this.customData=this.addFilterForm.value;
    this.customData['profile_pic']=this.filePreview;
    this._dataService.sendNotification(this.customData);


  }


}