import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BrandsComponent} from './components/brands/brands.component';
import {AddbrandComponent} from './components/brands/addbrand/addbrand.component';
import {EditbrandComponent} from './components/brands/editbrand/editbrand.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {ContactusComponent} from './components/contactus/contactus.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import {CountryComponent} from './components/country/country.component';
import {AddcountryComponent} from './components/country/addcountry/addcountry.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { AddcouponComponent } from './components/coupon/addcoupon/addcoupon.component';
import { EditcouponComponent } from './components/coupon/editcoupon/editcoupon.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SettingsComponent } from './components/settings/settings.component';

import {ViewcouponComponent} from './components/coupon/viewcoupon/viewcoupon.component'


import { MyprofileComponent } from './components/myprofile/myprofile.component';

 

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch:'full'
    // canActivate: [AuthGuard] 
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'addbrand/new',
    component: AddbrandComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'editbrand/:id',
    component: EditbrandComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'sendnotifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    pathMatch:'full',
    canActivate: [AuthGuard] 
  },
  {
    path: 'country',
    component: CountryComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'country/addNew',
    component: AddcountryComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon',
    component: CouponComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon/addNew',
    component: AddcouponComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon/edit/:id',
    component: EditcouponComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon-detail/:id',
    component: ViewcouponComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'requests',
    component: RequestsComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'myProfile',
    component: MyprofileComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
   redirectTo: '' 
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent]


