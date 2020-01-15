import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BrandsComponent} from './components/brands/brands.component';
import {AddbrandComponent} from './components/brands/addbrand/addbrand.component';
 

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent]

