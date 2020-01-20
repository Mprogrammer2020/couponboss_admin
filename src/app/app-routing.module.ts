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

import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';

 

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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent]


