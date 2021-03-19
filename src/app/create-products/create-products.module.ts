import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CreateProductsComponent } from './create_products/create-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CreateProductsRoutingModule } from './create-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MarkaComponent } from './marka/marka.component';
import { InputComponent } from './input/input.component';
import { ListeComponent } from './categories/liste/liste.component';
import { SelectColorComponent } from './select-color/select-color.component';
import { ProductsCreateComponent } from './products-create/products-create.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateProductsComponent,
    AdminComponent,
    MarkaComponent,
    InputComponent,
    ListeComponent,
    SelectColorComponent,
    ProductsCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    CreateProductsRoutingModule
  ]
})




export class CreateProductsModule { }
