import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XyzService } from './xyz.service';
import { HttpClientModule } from '@angular/common/http';    // add this
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [XyzService],
  bootstrap: [AppComponent]
})
export class AppModule { }
