import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { XyzService } from './xyz.service';
import { HttpClientModule } from '@angular/common/http';    // add this
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { SidebarComponent } from './components/commons/sidebar/sidebar.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AddbrandComponent } from './components/brands/addbrand/addbrand.component';
import { EditbrandComponent } from './components/brands/editbrand/editbrand.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactusComponent } from './components/contactus/contactus.component'; 
import { CountryComponent } from './components/country/country.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { AddcouponComponent } from './components/coupon/addcoupon/addcoupon.component';
import { EditcouponComponent } from './components/coupon/editcoupon/editcoupon.component';
import { AddcountryComponent } from './components/country/addcountry/addcountry.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ViewcouponComponent } from './components/coupon/viewcoupon/viewcoupon.component'; 
import { JwtHelperService, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';

import { SettingsComponent } from './components/settings/settings.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditprofileComponent } from './components/myprofile/editprofile/editprofile.component';

import { DatePipe } from '@angular/common'

import { DataTablesModule } from 'angular-datatables';

import { OwlDateTimeModule, OwlNativeDateTimeModule  } from 'ng-pick-datetime';
import { SocialComponent } from './components/social/social.component';
import { AddsocialComponent } from './components/social/addsocial/addsocial.component';
import { EditsocialComponent } from './components/social/editsocial/editsocial.component';

// import { FileUploadModule } from 'ng2-file-upload';

const yourTokenGetter: any = localStorage.getItem('token');
const yourWhitelistedDomains: any = "localhost:4200";


const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: yourTokenGetter,
      whitelistedDomains: yourWhitelistedDomains
  }
};

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BrandsComponent,
    AddbrandComponent,
    EditbrandComponent,
    NotificationsComponent,
    ContactusComponent,

    CountryComponent,
    CouponComponent,
    AddcouponComponent,
    EditcouponComponent,
    AddcountryComponent,
    RequestsComponent,
    ViewcouponComponent,
    SettingsComponent,
    MyprofileComponent,
    EditprofileComponent,
    SocialComponent,
    AddsocialComponent,
    EditsocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DataTablesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

    // FileUploadModule
  ],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
