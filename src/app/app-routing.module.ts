import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BrandsComponent} from './components/brands/brands.component';
import {AddbrandComponent} from './components/brands/addbrand/addbrand.component';
import {EditbrandComponent} from './components/brands/editbrand/editbrand.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {ContactusComponent} from './components/contactus/contactus.component';

 

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch:'full'
  },
  {
    path: 'brands',
    component: BrandsComponent,
    pathMatch:'full'
  },
  {
    path: 'addbrand/new',
    component: AddbrandComponent,
    pathMatch:'full'
  },
  {
    path: 'editbrand/:id',
    component: EditbrandComponent,
    pathMatch:'full',
  },
  {
    path: 'sendnotifications',
    component: NotificationsComponent,
    pathMatch:'full',
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent]

