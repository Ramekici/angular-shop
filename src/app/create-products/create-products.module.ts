import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CreateProductsComponent } from './create-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CreateProductsRoutingModule } from './create-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MarkaComponent } from './marka/marka.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateProductsComponent,
    AdminComponent,
    MarkaComponent
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
