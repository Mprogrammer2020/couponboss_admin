import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const API_URL="http://192.168.2.91:8001/apis/"; 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  // http options used for making API calls
  private httpOptions: any;
 
  private authhttpOptions: any;
  // the actual JWT token
  public token: any;
 
   //Router Reference
   private router: Router;

  // the token expiration date
  public token_expires: Date;
  public tok_data:any;
  // the username of the logged in user
  public username: any;

  public data: any;
 
  // error messages received from the login attempt
  public errors: any = [];
 
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', 'access-control-allow-origin': '*' })
    };


    this.authhttpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', 'access-control-allow-origin': '*', 'AUTHORIZATION':  localStorage.getItem('login_token')})
    };
  }
 
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post(API_URL+'login', JSON.stringify(user), this.httpOptions).subscribe(
      (data: any)  => {

        localStorage.setItem('login_token',  data.data['token'])
        localStorage.setItem('user', data.data['user'])
        this.token =  localStorage.getItem('login_token');
        console.log(data.data['user']['username'])
        this.updateData(data.data['token'], data.data['user']['first_name']);
        this.router.navigate(['dashboard']);
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }


  public dashboard() {
    this.http.get(API_URL+'dashboard', this.authhttpOptions).subscribe(
      (data: any)  => {
        this.data = data
      },
      (err:any)  => {
        console.log("errrrrrr"+err.error.message)
        this.errors = err.error.message;
      }
    );
  }
 
  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(API_URL+'login', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      (data: any)  => {
        localStorage.setItem('login_token',  JSON.stringify(data.data['token']))
        localStorage.setItem('user', JSON.stringify(data.data['user']))
        this.updateData(data.data['token'], data.data['user']['first_name']);
      },
      (err:any) => {
        this.errors = err.error.message;
      },
      () => {
        // No errors, route to new page
      }
    );
  }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }
 
  public updattoken() {
    this.token =  localStorage.getItem('login_token');
  }

  private updateData(token, user) {
    this.token =  localStorage.getItem('login_token');
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    // const token_parts = this.token.split(/\./);
    // const token_decoded = JSON.parse(window.atob(token_parts[1]));
    console.log("dbfcgdsbfffdjgb------->")
    this.tok_data = user
    // this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = user;
  }


  public authorized_user(){
    this.token =  localStorage.getItem('login_token');
    if (this.token){
     window.location.href='dashboard';
    }
    else{
      window.location.href='';
    }
  }
 
}