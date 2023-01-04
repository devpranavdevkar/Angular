import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataRoutingModule } from './metadata-routing.module';
import { MetadataComponent } from './metadata.component';

import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { InputTextModule } from 'primeng-lts/inputtext';
import { RippleModule } from 'primeng-lts/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng-lts/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CategoryComponent } from './category/category.component';
import { FileUploadModule } from 'primeng-lts/fileupload';

import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PincodeComponent } from './pincode/pincode.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { TodayDeliveryComponent } from './deliveries/today-delivery/today-delivery.component';
import { TomorrowDeliveryComponent } from './deliveries/tomorrow-delivery/tomorrow-delivery.component';
import { AllDeliveriesComponent } from './deliveries/all-deliveries/all-deliveries.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { MultipleProductsComponent } from './multiple-products/multiple-products.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { DividerBannerComponent } from './divider-banner/divider-banner.component';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { ProductReviewComponent } from './product-review/product-review.component';

import { WishlistComponent } from './wishlist/wishlist.component';

import { ProductReviewDetailsComponent } from './product-review-details/product-review-details.component';
import { TabViewModule } from 'primeng-lts/tabview';
import { InputSwitchModule } from 'primeng-lts/inputswitch';

@NgModule({
  declarations: [
    MetadataComponent,

    CategoryComponent,

    ProductComponent,
    ProductdetailsComponent,
    PincodeComponent,
    OrdersComponent,
    OrderDetailsComponent,

    TodayDeliveryComponent,
    TomorrowDeliveryComponent,
    AllDeliveriesComponent,
    MultipleProductsComponent,
    SlideshowComponent,
    DividerBannerComponent,
    CouponCodeComponent,
    CouponDetailsComponent,
    ProductReviewComponent,

    WishlistComponent,

    ProductReviewDetailsComponent,
  ],
  imports: [
    CommonModule,
    MetadataRoutingModule,
    RouterModule,
    NgxPaginationModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    FileUploadModule,
    NgbModule,
    InfiniteScrollModule,
    AutoCompleteModule,
    TabViewModule,
    InputSwitchModule,
  ],
})
export class MetadataModule {}
