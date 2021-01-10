import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdresgirComponent } from './checkout/adresgir/adresgir.component';
import { AuthGuard } from '../auth/auth.guard';
import { ShoppingComponent } from './shopping.component';
import { CantalarComponent } from './cantalar/cantalar.component';
import { CuzdanlarComponent } from './cuzdanlar/cuzdanlar.component';
import { OrderCompletedComponent } from './checkout/order-completed/order-completed.component';


const shoppingRoutes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'details/:productId', component: DetailProductComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout/orders', component: OrderCompletedComponent},
  {path: 'edits/:adresId', component: AdresgirComponent , canActivate: [AuthGuard]},
  {path: 'shop', component: ShoppingComponent},
  {path: 'shop/canta', component: CantalarComponent},
  {path: 'shop/cuzdan', component: CuzdanlarComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(shoppingRoutes)
  ],
  exports: [ RouterModule ]
})

export class ShoppingRouteModule {

}
