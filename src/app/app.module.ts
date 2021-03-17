import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './auth/error-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { KategorilerComponent } from './home/kategoriler/kategoriler.component';
import { HomeComponent } from './home/home.component';
import { TanitimComponent } from './home/tanitim/tanitim.component';
import { ArrivalsComponent } from './home/arrivals/arrivals.component';
import { ShopkategoriComponent } from './home/shopkategori/shopkategori.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OrdersComponent } from './account/orders/orders.component';
import { ShopadminComponent } from './shopadmin/shopadmin.component';
import { ProductionComponent } from './shopadmin/production/production.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { LeftsideComponent } from './account/leftside/leftside.component';
import { WishlistComponent } from './account/wishlist/wishlist.component';
import { HeadingComponent } from './account/heading/heading.component';
import { AllordersComponent } from './account/allorders/allorders.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { ModalDirective } from './directive/modal.directive';
import { ProdDirective } from './shopping/products/prod.directive';
import { ShoppingModule } from './shopping/shopping.module';
import { SearchComponent } from './shopping/search/search.component';
import { FeaturesComponent } from './shopping/detail-product/features/features.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './auth/error/error.component';
import { CategoriesComponent } from './header/categories/categories.component';
import { ArrowComponent } from './svg/arrow/arrow.component';
import { CreateProductsModule } from './create-products/create-products.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    KategorilerComponent,
    HomeComponent,
    TanitimComponent,
    ArrivalsComponent,
    ShopkategoriComponent,
    PagenotfoundComponent,
    OrdersComponent,
    ShopadminComponent,
    ProductionComponent,
    MyAccountComponent,
    LeftsideComponent,
    WishlistComponent,
    HeadingComponent,
    AllordersComponent,
    FeaturesComponent,
    SearchComponent,
    ErrorComponent,
    DropdownDirective,
    ModalDirective,
    ProdDirective,
    CategoriesComponent,
    ArrowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ShoppingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CreateProductsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
