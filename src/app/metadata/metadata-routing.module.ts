import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../service/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { PincodeComponent } from './pincode/pincode.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TodayDeliveryComponent } from './deliveries/today-delivery/today-delivery.component';
import { TomorrowDeliveryComponent } from './deliveries/tomorrow-delivery/tomorrow-delivery.component';
import { AllDeliveriesComponent } from './deliveries/all-deliveries/all-deliveries.component';
import { MultipleProductsComponent } from './multiple-products/multiple-products.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { DividerBannerComponent } from './divider-banner/divider-banner.component';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductReviewDetailsComponent } from './product-review-details/product-review-details.component';
import { ProductReviewComponent } from './product-review/product-review.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  {
    path: 'slideshow',
    component: SlideshowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'divider-banner',
    component: DividerBannerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'coupon-code',
    component: CouponCodeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'coupon-details/:id',
    component: CouponDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-Images',
    component: MultipleProductsComponent,
    canActivate: [AuthGuard],
  },

  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  {
    path: 'product_details/:id',
    component: ProductdetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'pincode', component: PincodeComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'order_details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'today_deliveries',
    component: TodayDeliveryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tomorrow_deliveries',
    component: TomorrowDeliveryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all_deliveries',
    component: AllDeliveriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product_review',
    component: ProductReviewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'review-details/:id',
    component: ProductReviewDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetadataRoutingModule {}
