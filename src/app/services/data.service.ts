import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, JsonpInterceptor} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


const API_URL="http://192.168.2.57:8000/apis/"; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private authhttpOptions: any;
  private authhttpOptionsupload: any;
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

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
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
        console.log("dashdata---->")
        console.log(dashdata)
        this.dashboarddata = dashdata
      },
      (err:any)  => {
        console.log("errrrrrr----->"+err.error.message)
        this.errors = err.error.message;
        // localStorage.clear();
        // this.router.navigate(['']);
      }
    );
  }


   public getBrandsList(){
    this.http.get(API_URL+'getbrands', this.authhttpOptions).subscribe(
      (data: any)  => {
        // window.location.href = '/brands'
        //alert("Brand Created Successfully")
        // this.router.navigate(['brands']);
        this.brandslist = data.response
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
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
        //  this.router.navigate(['']);
      }
    );
  }


  public getCoupon(data){
    this.http.post(API_URL+'dc',{"couponId":data}, this.authhttpOptions).subscribe(
      (data: any)  => {
        this.branddetail = data.coupon;
        console.log(this.branddetail)
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        //  this.router.navigate(['']);
      }
    );
  }


  public addBrand(brand, formdata){
    var is_file=brand["is_file"]
    this.http.post(API_URL+'add_brands', JSON.stringify(brand), this.authhttpOptions).subscribe(
      (data: any)  => {
        debugger
        formdata.append('id' ,data["brand"]);
        if(is_file == true)
        {
          this.upload_file(formdata)
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
      }
    );     
  }

  public deleteBrand(data){
    this.http.post(API_URL+'delete_brand',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Brand Deleted Successfully")
       this.getBrandsList()
     },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
      }
    );
  }

  public upload_file(image_data){
    this.http.post(API_URL+'uploadfile',image_data, this.authhttpOptionsupload).subscribe(
      (data: any)  => {
      alert("Brand edited Successfully")
      //  window.location.href = '/brands'
      this.router.navigate(['brands']);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
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
          this.upload_file(formdata)
        }else{
          alert("Brand edited Successfully");
          this.router.navigate(['brands']);
        }
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        alert("Something Went Wrong.")
        this.router.navigate(['']);
      }
    );
  }


  public getUsers(){
    this.http.get(API_URL+'getusers', this.authhttpOptions).subscribe(
      (data: any)  => {
        console.log("xfxcgfcgccg")
        this.userslist = data.response
        // window.location.href = '/brands'
        this.branddetail = data.brand;
        this.brandcountries = data.brands_country
        console.log("scdgsavef")
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert("Something Went Wrong.")
        this.errors = err.error.message;
        //  this.router.navigate(['']);
      }
    );
     
   }

   public sendNotification(data){
    this.http.post(API_URL+'sendnotification',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Notification Send Successfully")
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

  public contactuslist(){
    this.http.get(API_URL+'countactuslist', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.brandslist = data.countactuslist
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

  public requestcouponlist(){
    this.http.get(API_URL+'get_coupon_request', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.requestlist = data.response
      //  alert("Notification Send Successfully")
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        alert(err.error.Message)
        // window.location.href = '/sendnotifications'
      }
    );
  }


  // public getBrandsList(){
  // this.http.get(API_URL+'getbrands', this.authhttpOptions).subscribe(
  //   (data: any)  => {
  //     // window.location.href = '/brands'
  //     //alert("Brand Created Successfully")
  //     // this.router.navigate(['brands']);
  //     this.brandslist = data.response
  //   },
  //   (err:any)  => {
  //     console.log("errrrrrr"+err.error.message)
  //     this.errors = err.error.message;
  //     this.router.navigate(['']);
  //   }
  // );
  // }

//   public getBrand(data){
//   this.http.post(API_URL+'show_brand',{"brandId":data}, this.authhttpOptions).subscribe(
//     (data: any)  => {
//       this.branddetail = data.brand;
//       this.brandcountries = data.brands_country
      
//       console.log("scdgsavef")
//     },
//     (err:any)  => {
//       console.log("errrrrrr"+err.error.message)
//       this.errors = err.error.message;
//         this.router.navigate(['']);
//     }
//   );
// }

  // public addBrand(brand){
  //   this.http.post(API_URL+'add_brands', JSON.stringify(brand), this.authhttpOptions).subscribe(
  //     (data: any)  => {
  //       window.location.href = '/brands'
  //     },
  //     (err:any)  => {
  //       console.log("errrrrrr"+err.error.message)
  //       this.errors = err.error.message;
  //       //  this.router.navigate(['']);
  //     }
  //   );     
  // }

  // public deleteBrand(data){
  //   this.http.post(API_URL+'delete_brand',JSON.stringify(data), this.authhttpOptions).subscribe(
  //     (data: any)  => {
  //      alert("Brand Deleted Successfully")
  //      this.getBrandsList()
  //    },
  //     (err:any)  => {
  //       console.log("errrrrrr"+err.error.message)
  //       this.errors = err.error.message;
  //     }
  //   );
  // }

  // public editBrand(data){
  //   this.http.put(API_URL+'edit_brands',JSON.stringify(data), this.authhttpOptions).subscribe(
  //     (data: any)  => {
  //      alert("Brand edited Successfully")
  //     //  window.location.href = '/brands'
  //      this.router.navigate(['brands']);
  //     },
  //     (err:any)  => {
  //       console.log("errrrrrr"+err.error.message)
  //       this.errors = err.error.message;
  //       this.router.navigate(['']);
  //     }
  //   );
  // }


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


  public addCountry(country){
    var is_file=country["is_file"]

    this.http.post(API_URL+'add_country', JSON.stringify(country), this.authhttpOptions).subscribe(
      (data: any)  => {
        // formdata.append('id',data["country"]);
        if(is_file == true)
        {
          // this.upload_file(formdata)
        }else{
          alert("Country Added Successfully.");
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
       this.getCountries()
     },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }
   
  public getCoupons(){
    this.http.get(API_URL+'get_coupons', this.authhttpOptions).subscribe(
      (data: any) => {
        this.couponslist = data.response
      },
      (err:any) => {
        console.log("error"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  public addCoupon(coupon){
    this.http.post(API_URL+'add_coupon', JSON.stringify(coupon), this.authhttpOptions).subscribe(
      (data: any)  => {
        window.location.href = '/coupon'
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
        //  this.router.navigate(['']);
      }
    );     
  }


  public deleteCoupon(data){
    this.http.post(API_URL+'delete_coupon',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("Coupon Deleted Successfully")
       this.getCountries()
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



  public editCoupon(data){
    this.http.put(API_URL+'edit_coupon',JSON.stringify(data), this.authhttpOptions).subscribe(
      (data: any)  => {
       alert("coupon edited Successfully")
       this.router.navigate(['coupon']);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }

  public getBaseUrl(){
    return API_URL;

  }

  public getAdminProfile(){
    this.http.get(API_URL+'get_admin_profile', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.adminprofile = data.response
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

  

}
