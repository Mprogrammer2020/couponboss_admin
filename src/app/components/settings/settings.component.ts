import { Component, OnInit } from '@angular/core';
import { FormBuilder,AbstractControl, FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private _dataService:DataService,private httpClient: HttpClient,private router: Router,) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
     confirmPassword: ['', [Validators.required]],


  });
  }
  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.changePasswordForm.value['newPassword']!= this.changePasswordForm.value['confirmPassword'] ){
      $('#idError').text("New password & confirm password did n't match.")
      return;
    }
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
        return;
    }
    this._dataService.changePassword(this.changePasswordForm.value).subscribe(
      (res:any)=>{
      alert(res['message']);
      this.router.navigate(['']);


    },
    (error:any)=>{

      if(error.status==401){
        this.router.navigate(['']);
        };
      alert(error.error.message);    
    }
  
  );

    
  
  }

}
