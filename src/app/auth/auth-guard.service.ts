import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {  
  constructor(public auth: DataService, public router: Router) {} 
  
   canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}