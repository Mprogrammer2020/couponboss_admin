import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  private currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  selectedElement:any;


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 

  constructor(private formBuilder: FormBuilder,private _dataService: DataService,private router: Router,private _location: Location) { }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      response: ['',[Validators.required]]
    });

    this.getData(this.currentPage,this.itemsPerPage)
    $('#contact_sidebar').addClass('active');
  }
  
  backClicked() {
    this._location.back();
  }

  public setValue() { 
    this.currentPage=1;
    this.getData(this.currentPage,this.itemsPerPage)
  }

  public getNext(page: any){
    this.currentPage = page;
    this.getData(this.currentPage,this.itemsPerPage);
  }

  getData(pageNo: any,maxResults: any){
    
    this._dataService.contactuslist(pageNo,maxResults);
}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
  
    this.customData=this.addFilterForm.value;
    // this.customData['profile_pic']=this.filePreview;
    this._dataService.sendResponse(this.customData);


  }

}
