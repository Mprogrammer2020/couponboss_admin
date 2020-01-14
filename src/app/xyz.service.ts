import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class XyzService {

//   constructor() { }
// }



// import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
const API_URL="http://192.168.2.91:8001/apis/"; 
@Injectable({
  providedIn: 'root'
})
export class XyzService {
 
  // http options used for making API calls
  private httpOptions: any;
 
  // the actual JWT token
  public token: any;
 
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
  }
 
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post(API_URL+'login', JSON.stringify(user), this.httpOptions).subscribe(
      (data: any)  => {

        localStorage.setItem('login_token',  JSON.stringify(data.data['token']))
        localStorage.setItem('user', JSON.stringify(data.data['user']))
        this.token =  localStorage.getItem('login_token');
        console.log(data.data['user']['username'])
        this.updateData(data.data['token'], data.data['user']['first_name']);
      },
      err => {
        this.errors = err['error'];
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
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
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
 
}