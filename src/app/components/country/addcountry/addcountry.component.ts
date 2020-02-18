// import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef  } from '@angular/core';

import {Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
//import LatLng = google.maps.LatLng;
// import {LocationPickerModule} from "ng-location-picker";
declare var google: any;

@Component({
  selector: 'app-addcountry',
  templateUrl: './addcountry.component.html',
  styleUrls: ['./addcountry.component.css']
})
export class AddcountryComponent implements OnInit {

  public editObj:any;
  addFilterForm: FormGroup;
  submitted = false;
  customData:any;

  fileName: string;
  filePreview: string;
  myString: string;
  is_file:boolean = false;


  lat:string = "";
  long:string = "";
  countryname:any;




  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  // @ViewChild('addresstext'), {static: false}) addresstext: any;

  @ViewChild("addresstext", {static: false}) addresstext:any;

  autocompleteInput: string;
  queryWait: boolean;



  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  constructor(public formBuilder: FormBuilder,public _dataService:DataService ,public http: HttpClient ,public router: Router) { }

  ngOnInit() {
    this.addFilterForm = this.formBuilder.group({

      logo:[''],
      lat:'',
      long:'',
      countryName: ['',[Validators.required]]
    });
    

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


  // Google Places API Implementation
  /** ---------------------------start-------------------------------- **/

  ngAfterViewInit() {
      this.getPlaceAutocomplete();
  }

  public getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
        {
            types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
        });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.invokeEvent(place);
    });
  }

  invokeEvent(place: any) {
    var country_name;
    this.setAddress.emit(place);
    this.lat =  place.geometry.location.lat();
    this.long = place.geometry.location.lng();
    var searchAddressComponents = place.address_components;
    $.each(searchAddressComponents, function(){
      if(this.types[0]=="country" || this.types[0]=="colloquial_area"){
        country_name = this.long_name;  
      }
    });
    this.countryname = country_name
  }

/** ---------------------------End-------------------------------- **/


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addFilterForm.invalid) {
        return;
    }
    let formData = new FormData();
    formData.append('file' ,  this.filePreview);
    formData.append('type' , "country");
    this.customData=this.addFilterForm.value;
    this.customData.countryName = this.countryname;
    this.customData.lat = this.lat ;
    this.customData.long = this.long 
    this.customData['is_file']= this.is_file;
    
    console.log(this.customData)
    this.customData=this.addFilterForm.value;
    this.customData['profile_pic']=this.filePreview;
    this._dataService.addCountry(this.customData, formData);

  }

}
