import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, JsonpInterceptor,HttpParams} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


//const API_URL="http://157.245.218.104:8000/apis/"; 
const API_URL="http://0.0.0.0:8000/apis/"; 

//const API_URL="http://68.183.133.217:8000/apis/"; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public authhttpOptions: any;
  public authhttpOptionsupload: any;
  public errors:any;
  public brandslist:any;
  public countrieslist:any;
  public dashboarddata:any;
  // public router: Router;
  public branddetail:any;
  public brandcountries:any;
  public userslist:any;
  public couponslist:any;
  public couponcountries:any;
  public adminprofile:any;
  public requestlist:any;
  public coupondetail:any;
  public totalItems:any;
  public couponbrands:any;
  public currentuser:any;
  public currentadmin:any;
  public sociallist:any;

  public is_response:boolean = false;

  

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    this.authhttpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', 'access-control-allow-origin': '*', 'AUTHORIZATION':  localStorage.getItem('token')})
    
    };

    this.authhttpOptionsupload = {
      headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 'AUTHORIZATION':  localStorage.getItem('token')})
    };
   }

  // Check whether the token is expired and return
  public isAuthenticated(): boolean {   
    const token = localStorage.getItem('jwt_token'); 
    return !this.jwtHelper.isTokenExpired(token);
  }
   
  public dashboard() {
    this.http.get(API_URL+'dashboard', this.authhttpOptions).subscribe(
      (dashdata: any)  => {
        this.dashboarddata = dashdata
      },
      (err:any)  => {
        console.log("errrrrrr----->"+err.error.message)
        this.errors = err.error.message;
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }


   public getBrandsList(pageNo:any,maxRecords:any){
    let httpParams = new HttpParams().set('pageNo', pageNo).set('maxRecords', maxRecords)
    this.http.get(API_URL+'getbrands', {headers: { 'Authorization':  localStorage.getItem('token')},params: httpParams}).subscribe(
      (data: any)  => {
        // window.location.href = '/brands'
        //alert("Brand Created Successfully")
        // this.router.navigate(['brands']);
        this.brandslist = data.response;
        this.is_response = true;
        
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
   }

   public getBrand(data){
    this.http.post(API_URL+'show_brand',{"brandId":data}, this.authhttpOptions).subscribe(
      (data: any)  => {
        this.branddetail = data.brand;
        this.brandcountries = data.brands_country
        
        console.log("scdgsavef")
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
        //  this.router.navigate(['']);
      }
    );
  }


  public getCoupon(data){
    this.http.post(API_URL+'dc',{"couponId":data}, this.authhttpOptions).subscribe(
      (data: any)  => {
        this.branddetail = data.coupon;
        this.couponcountries = data.cop_con
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
        //  this.router.navigate(['']);
      }
    );
  }


  public addBrand(brand, formdata){
    var is_file=brand["is_file"]
    this.http.post(API_URL+'add_brands', JSON.stringify(brand), this.authhttpOptions).subscribe(
      (data: any)  => {
        formdata.append('id' ,data["brand"]);
        if(is_file == true)
        {
          this.upload_file(formdata, "brands", "Added")
        }else{
          alert("Brand Added Successfully");
          this.router.navigate(['brands']);
        }
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;

        //  this.router.navigate(['']);

        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
      }
    );     
  }

  public deleteBrand(data){
    this.http.post(API_URL+'delete_brand',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Brand Deleted Successfully")
       this.getBrandsList(1,2)
     },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }

  public upload_file(image_data,redirect_url, operation){
    this.http.post(API_URL+'uploadfile',image_data, this.authhttpOptionsupload).subscribe(
      (data: any)  => {
        if(redirect_url == "sendnotifications"){ 
          alert("Notification Send Successfully.")
        }
        else if(redirect_url == "myProfile"){ 
          alert("Profile Updated Successfully.")
        }
        else if(redirect_url == "brands"){
          alert("Brand" + " "+ operation +" Successfully.")
        }
        else if(redirect_url == "country"){
          alert("Country" + " "+ operation +" Successfully.")
        }
        else if(redirect_url == "coupon"){
          alert("Coupon" + " "+ operation +" Successfully.")
        }
        else{
          alert(redirect_url.charAt(0).toUpperCase() + " "+ operation +" Successfully")
        }
          
        
          this.router.navigate([redirect_url]);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
      }
    );


  }


  public updateAdminProfile(editdata , formdata){
    var is_file = editdata["is_file"]
    this.http.post(API_URL+'updateProfile',JSON.stringify(editdata), this.authhttpOptions).subscribe(
      (data: any)  => {
        formdata.append('id',data["user"]);
        if(is_file == true)
        {
          this.upload_file(formdata, "myProfile", "Edit")
        }
        else
        {
          alert("User edited Successfully")
          this.router.navigate(['myProfile']);
        }
       
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong");
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }
  

  public editBrand(editdata, formdata){
    var is_file=editdata["is_file"]
    this.http.put(API_URL+'edit_brands',JSON.stringify(editdata), this.authhttpOptions).subscribe(
      (data: any)  => {
        formdata.append('id' ,data["brand"]);
        if(is_file == true)
        {
          this.upload_file(formdata, "brands", "Edited")
        }else{
          alert("Brand edited Successfully");
          this.router.navigate(['brands']);
        }
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }


  public getUsers(){
    this.http.get(API_URL+'getusers', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.userslist = data.response
        // window.location.href = '/brands'
        this.branddetail = data.brand;
        this.brandcountries = data.brands_country
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert("Something Went Wrong.")
        this.errors = err.error.message;
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
     
   }

   public sendNotification(notdata, formdata){
      var is_file=notdata["is_file"]
    this.http.post(API_URL+'sendnotification',JSON.stringify(notdata), this.authhttpOptions).subscribe(
      (data: any)  => {
        if(data['notification'].length){
          formdata.append('id',data["notification"][0]);
          if(is_file == true)
          {
            this.upload_file(formdata,"sendnotifications", "")
          }}
          else{
          alert("Notification Send Successfully");
          this.router.navigate(['sendnotifications']);
        }
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert(err.error.Message)
        if (err.error.Message == undefined){
          alert("Something Went Wrong.")
          this.router.navigate(['sendnotifications']);
        }
        // window.location.href = '/sendnotifications'
      }
    );
  }


  public contactuslist(pageNo:any,maxRecords:any){
    let httpParams = new HttpParams().set('pageNo', pageNo).set('maxRecords', maxRecords)
    this.http.get(API_URL+'countactuslist', {headers: { 'Authorization':  localStorage.getItem('token')},params: httpParams}).subscribe(
      (data: any)  => {
        this.brandslist = data.countactuslist
        this.is_response = true;
      //  alert("Notification Send Successfully")
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert(err.error.Message)
        // window.location.href = '/sendnotifications'
      }
    );
  }

  public sendResponse(data){
    this.http.post(API_URL+'sendresponse',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
        alert("Response Send Successfully")
        window.location.href = '/contactus'
        // this.router.navigate(['contactus']);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert(err.error.Message)
        this.router.navigate(['']);
      }
    );

  }

  public requestcouponlist(pageNo:any,maxRecords:any){
    let httpParams = new HttpParams().set('pageNo', pageNo).set('maxRecords', maxRecords)
    this.http.get(API_URL+'get_coupon_request', {headers: { 'Authorization':  localStorage.getItem('token')},params: httpParams}).subscribe(
      (data: any)  => {
        this.requestlist = data.response
        this.is_response = true;
        console.log(this.requestlist)
      //  alert("Notification Send Successfully")
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert(err.error.Message)
        // window.location.href = '/sendnotifications'
      }
    );
  }


  

  public getCountries(pageNo:any,maxRecords:any){
    let httpParams = new HttpParams().set('pageNo',pageNo).set('maxRecords',maxRecords)

  this.http.get(API_URL+'get_countries', {headers: { 'Authorization': localStorage.getItem('token')},params: httpParams}).subscribe(
    (data: any)  => {
      this.countrieslist = data.response;
      this.totalItems = data.count;
      this.is_response = true;
    },
    (err:any)  => {
      console.log("errrrrrr"+err.error.message)
      this.errors = err.error.message;
    }
  );
}


  public addCountry(country, formdata){
    var is_file=country["is_file"]

    this.http.post(API_URL+'add_country', JSON.stringify(country), this.authhttpOptions).subscribe(
      (data: any)  => {

        if (data["country_added"] == 0 )
        {
          formdata.append('id',data["country"]);
          if(is_file == true)
          {
            this.upload_file(formdata,"country", "Added")
          }else{
            alert("Country Added Successfully.");
            this.router.navigate(['country']);
          }
        }
        else{
          alert("Country Already Added.");
          this.router.navigate(['country']);

        }
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  public deleteCountry(data){
    this.http.post(API_URL+'delete_country',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Country Deleted Successfully")
       this.getCountries(1,2)
     },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }
   
  public getCoupons(pageNo:any,maxRecords:any){
    let httpParams = new HttpParams().set('pageNo',pageNo).set('maxRecords',maxRecords)
    this.http.get(API_URL+'get_coupons', {headers:{'Authorization': localStorage.getItem('token')},params:httpParams}).subscribe(
      (data: any) => {
        this.couponslist = data.response
        this.is_response = true;
      },
      (err:any) => {
        console.log("error"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  public addCoupon(coupon, formdata){
    var is_file=coupon["is_file"]
    this.http.post(API_URL+'add_coupon', JSON.stringify(coupon), this.authhttpOptions).subscribe(
      (data: any)  => {
        formdata.append('id' , data["coupon"]);
        if(is_file == true)
        {
          this.upload_file(formdata, "coupon", "Added")
        }
        else
        {
          alert("Coupon Added Successfully");
          this.router.navigate(['coupon']);
        }
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        //  this.router.navigate(['']);
        alert("Something Went Wrong.")
      }
    );     
  }
  


  public deleteCoupon(data){
    this.http.post(API_URL+'delete_coupon',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Coupon Deleted Successfully")
       this.getCoupons(1,2)
     },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  // public getCoupon(data){
  //   this.http.post(API_URL+'detail_coup',{"couponId":data}, this.authhttpOptions).subscribe(
  //     (data: any)  => {
  //       this.coupondetail = data.coup;
  //       this.couponcountries = data.coupon_country
        
  //       console.log("scdgsavef")
  //     },
  //     (err:any)  => {
  //       console.log("errrrrrr"+err.error.message)
  //       this.errors = err.error.message;
  //        this.router.navigate(['']);
  //     }
  //   );
  // }



  public editCoupon(editdata , formdata){
    var is_file = editdata["is_file"]
    this.http.post(API_URL+'edit_coupon',JSON.stringify(editdata), this.authhttpOptions).subscribe(
      (data: any)  => {
        formdata.append('id',data["coupon"]);
        if(is_file == true)
        {
          this.upload_file(formdata, "coupon", "Edit")
        }
        else
        {
          alert("coupon edited Successfully")
          this.router.navigate(['coupon']);
        }
       
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong")
        this.router.navigate(['']);
      }
    );
  }

  public getBaseUrl(){
    return API_URL;

  }

  public getAdminProfile(){
    this.http.get(API_URL+'get_admin_profile', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.adminprofile = data.response;
        
        this.currentadmin = data.response[0];
        console.log(this.currentadmin)
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  public changePassword(body:any){ 

    return this.http.post<any>(API_URL + 'change_admin_password',body,this.authhttpOptions);
  }

  public filterCoupon(data){
    this.http.get(API_URL+'get_coupons?search=true&data='+JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
        this.couponslist = data.response
        //  this.router.navigate(['']);
      },
      (err:any) => {
        alert("Something Went Wrong.")
      }
    );     
  }




  // public addBanner(banner, formdata){
  //   var is_file=banner["is_file"]
  //   this.http.post(API_URL+'add_banner', JSON.stringify(banner), this.authhttpOptions).subscribe(
  //     (data: any)  => {
  //       formdata.append('id' ,data["banner"]);
  //       if(is_file == true)
  //       {
  //         this.upload_file(formdata, "banner", "Added")
  //       }else{
  //         alert("Banner Added Successfully");
  //         this.router.navigate(['banner']);
  //       }
  //     },
  //     (err:any)  => {
  //       console.log("errrrrrr"+err.error.message)
  //       this.errors = err.error.message;
  //     }
  //   );
    

  // }  
  
  public getSocial(){

    this.http.get(API_URL+'get_social', this.authhttpOptions).subscribe(
      (data: any) => {
        this.sociallist = data.response
      },
      (err:any) => {
        console.log("error"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  public deleteSocial(data){
    this.http.post(API_URL+'delete_social',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Country Deleted Successfully")
       this.getSocial()
     },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }


  public addSocial(data){
    this.http.post(API_URL+'add_social', JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
          alert("SocialLink Added Successfully");
          this.router.navigate(['social']);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;

        //  this.router.navigate(['']);

        alert("Something Went Wrong.")
      }
    );     
  }

  public editSocial(editdata){
    this.http.put(API_URL+'edit_social',JSON.stringify(editdata), this.authhttpOptions).subscribe(
      (data: any)  => {
          alert("SocialLink edited Successfully");
          this.router.navigate(['social']);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        this.router.navigate(['']);
      }
    );
  }


  

}
