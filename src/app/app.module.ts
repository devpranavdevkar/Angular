import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetismenuAngularModule } from '@metismenu/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng-lts/button';
import { RippleModule } from 'primeng-lts/ripple';
import { ClickOutsideModule } from 'ng-click-outside';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from './shared/shared.module';
import { HasPermissionDirective } from './service/has-permission.directive';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MetadataModule } from './metadata/metadata.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwtInterceptor } from './service/jwt.interceptor';
import { DropdownModule } from 'primeng-lts/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardModule } from 'primeng-lts/card';

import { CalendarModule } from 'primeng-lts/calendar';
// import { CalendarModule } from 'primeng-lts/calendar';

@NgModule({
  declarations: [
    AppComponent,
    HasPermissionDirective,
    CustomerComponent,
    // MultipleImagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MetismenuAngularModule,
    ButtonModule,
    RippleModule,
    ClickOutsideModule,
    BsDropdownModule.forRoot(),
    SharedModule,
    Ng2IziToastModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MetadataModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    DropdownModule,
    TabsModule.forRoot(),
    InfiniteScrollModule,
    CardModule,
    CalendarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
