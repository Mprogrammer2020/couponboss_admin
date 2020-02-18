import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import {throwError} from 'rxjs';
import {NgForm} from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public currentPage:any=1; // set current page to 1
  public itemsPerPage:any=3; // we are showing 10 items per page

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  selectedElement:any;

  dtOptions: DataTables.Settings = {};

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  constructor(public formBuilder: FormBuilder,public _dataService: DataService,public router: Router,public _location: Location) { }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      response: ['',[Validators.required]]
    });

    this.getData(this.currentPage,this.itemsPerPage)
    $('#request_sidebar').addClass('active');
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.loadscript();

  }

    get f() { return this.addFilterForm.controls; }


  backClicked() {
    this._location.back();
  }

  public setValue() { 
    this.currentPage=1;
    this.getData(this.currentPage,this.itemsPerPage)
  }

  public loadscript()
  {
    
  $(document).ready(function(){
    // $("#myInput").on("keyup", function() {
    //   var value = $(this).val().toLowerCase();
    //   $("#myTable tr").filter(function() {
    //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //   });
    // });
  });

  }

  public getNext(page: any){
    this.currentPage = page;
    this.getData(this.currentPage,this.itemsPerPage);
  }

  getData(pageNo: any,maxResults: any){
    
    this._dataService.requestcouponlist(pageNo,maxResults);
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
