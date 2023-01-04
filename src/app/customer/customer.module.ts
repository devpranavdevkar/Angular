import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import {ButtonModule} from 'primeng-lts/button';
import {RippleModule} from "primeng-lts/ripple";
import { ClickOutsideModule } from 'ng-click-outside';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import {DropdownModule} from 'primeng-lts/dropdown';
import {InputTextModule} from 'primeng-lts/inputtext';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {MultiSelectModule} from 'primeng-lts/multiselect';
import { PasswordModule } from "primeng-lts/password";
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
  declarations: [
    ViewCustomerComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ButtonModule,
    RippleModule,
    ClickOutsideModule,
    BsDropdownModule.forRoot(),
    Ng2IziToastModule,
    NgxSpinnerModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    DropdownModule,
    TabsModule.forRoot(),
    MultiSelectModule,
    PasswordModule
  ]
})
export class CustomerModule { }
