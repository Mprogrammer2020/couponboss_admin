import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  selectedElement:any;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  constructor(private formBuilder: FormBuilder,private _dataService: DataService,private router: Router) {this._dataService.requestcouponlist(); }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      response: ['',[Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
  
    this.customData=this.addFilterForm.value;
    debugger
    // this.customData['profile_pic']=this.filePreview;
    this._dataService.sendResponse(this.customData);


  }

}
