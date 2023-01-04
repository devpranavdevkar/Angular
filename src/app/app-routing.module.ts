import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataComponent } from './metadata/metadata.component';
import { AuthGuard } from './service/auth.guard';
import { CategoryComponent } from './metadata/category/category.component';
import { ProductComponent } from './metadata/product/product.component';
import { ProductdetailsComponent } from './metadata/productdetails/productdetails.component';
import { PincodeComponent } from './metadata/pincode/pincode.component';
import { LoginGuard } from './service/login.guard';
import { OrdersComponent } from './metadata/orders/orders.component';
import { TodayDeliveryComponent } from './metadata/deliveries/today-delivery/today-delivery.component';
import { TomorrowDeliveryComponent } from './metadata/deliveries/tomorrow-delivery/tomorrow-delivery.component';
import { AllDeliveriesComponent } from './metadata/deliveries/all-deliveries/all-deliveries.component';
import { MultipleProductsComponent } from './metadata/multiple-products/multiple-products.component';
import { SlideshowComponent } from './metadata/slideshow/slideshow.component';
import { DividerBannerComponent } from './metadata/divider-banner/divider-banner.component';
import { CouponCodeComponent } from './metadata/coupon-code/coupon-code.component';
import { ProductReviewComponent } from './metadata/product-review/product-review.component';
import { WishlistComponent } from './metadata/wishlist/wishlist.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'metadata',
    component: MetadataComponent,
    children: [
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product-Images',
        component: MultipleProductsComponent,
        canActivate: [AuthGuard],
      },

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
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthGuard],
      },

      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },

      {
        path: 'product_details/:id',
        component: ProductdetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pincode',
        component: PincodeComponent,
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
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
