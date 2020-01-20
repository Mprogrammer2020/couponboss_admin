import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XyzService } from './xyz.service';
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
import { JwtHelperService, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';

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
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [XyzService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
