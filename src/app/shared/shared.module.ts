import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MetismenuAngularModule } from '@metismenu/angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from '../app-routing.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  exports: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    MetismenuAngularModule,
    ClickOutsideModule,
    BsDropdownModule,
    AppRoutingModule,
    CollapseModule,
    FormsModule,
  ],
})
export class SharedModule {}
