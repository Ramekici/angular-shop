import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingRouteModule } from './shopping-routing.module';
import { AngularMaterialModule } from '../angular-material.module';

import { ShoppingComponent } from './shopping.component';
import { ProductsComponent } from './products/products.component';
import { FilteringComponent } from './filtering/filtering.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OdemetipiComponent } from './checkout/odemetipi/odemetipi.component';
import { SepettekilerComponent } from './checkout/sepettekiler/sepettekiler.component';
import { CartComponent } from './cart/cart.component';
import { MaliyetComponent } from './cart/maliyet/maliyet.component';
import { CantalarComponent } from './cantalar/cantalar.component';
import { CuzdanlarComponent } from './cuzdanlar/cuzdanlar.component';
import { AdresgirComponent } from './checkout/adresgir/adresgir.component';
import { KayitliComponent } from './checkout/kayitli/kayitli.component';
import { DescriptionComponent } from './detail-product/description/description.component';
import { ReviewsComponent } from './detail-product/reviews/reviews.component';
import { KredikartComponent } from './checkout/kredikart/kredikart.component';
import { AdresmodalComponent } from './checkout/adresmodal/adresmodal.component';
import { FiltergorselComponent } from './filtering/filtergorsel/filtergorsel.component';
import { StarComponent } from './detail-product/star/star.component';
import { OrderCompletedComponent } from './checkout/order-completed/order-completed.component';


@NgModule({
  declarations: [
    ShoppingComponent,
    ProductsComponent,
    FilteringComponent,
    DetailProductComponent,
    DescriptionComponent,
    ReviewsComponent,
    CheckoutComponent,
    AdresgirComponent,
    KayitliComponent,
    OdemetipiComponent,
    SepettekilerComponent,
    CartComponent,
    MaliyetComponent,
    CantalarComponent,
    CuzdanlarComponent,
    KredikartComponent,
    AdresmodalComponent,
    FiltergorselComponent,
    StarComponent,
    OrderCompletedComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRouteModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],

})

export class ShoppingModule {

}
