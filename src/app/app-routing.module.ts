import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth/auth.guard';
import { ShopadminComponent } from './shopadmin/shopadmin.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { OrdersComponent } from './account/orders/orders.component';
import { WishlistComponent } from './account/wishlist/wishlist.component';
import { AllordersComponent } from './account/allorders/allorders.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'checkout-orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'account-current', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: 'account-orders', component: AllordersComponent, canActivate: [AuthGuard]},
  {path: 'account-wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'shopadmin', component: ShopadminComponent},
  {path: 'not-found', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
