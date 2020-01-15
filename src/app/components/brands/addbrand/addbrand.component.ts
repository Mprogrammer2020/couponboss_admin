import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(private formBuilder: FormBuilder,private _dataService:DataService,private http: HttpClient,private router: Router, private cd: ChangeDetectorRef ) { }

  ngOnInit() {

    this.addFilterForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      website_url: ['',[Validators.required]],
      logo:[''],
      country: ['', [Validators.required]]
    });

    this._dataService.getCountries();
  }

  get f() { return this.addFilterForm.controls; }


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
    this._dataService.addBrand(this.customData);


  }

}
