import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, JsonpInterceptor} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const API_URL="http://192.168.2.91:8001/apis/"; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private authhttpOptions: any;
  public errors:any;
  public brandslist:any;
  public countrieslist:any;
  public dashboarddata:any;
  public router: Router;

  constructor(private http: HttpClient) {
    this.authhttpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', 'access-control-allow-origin': '*', 'AUTHORIZATION':  localStorage.getItem('login_token')})
    };
   }

   public getBrandsList(){
    this.http.get(API_URL+'getbrands', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.brandslist = data.response
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
   }

   public dashboard() {
    this.http.get(API_URL+'dashboard', this.authhttpOptions).subscribe(
      (dashdata: any)  => {
        console.log("dashdata---->")
        console.log(dashdata)
        this.dashboarddata = dashdata
      },
      (err:any)  => {
        console.log("errrrrrr----->"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

   public addBrand(brand){
    this.http.post(API_URL+'add_brands', JSON.stringify(brand), this.authhttpOptions).subscribe(
      (data: any)  => {
        window.location.href = '/brands'
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        //  this.router.navigate(['']);
      }
    );
     
   }

   public getCountries(){
    this.http.get(API_URL+'get_countries', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.countrieslist = data.response
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

}
