import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductsComponent } from './create-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { MarkaComponent } from './marka/marka.component';


const adminRoutes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
    {path: 'create', component: CreateProductsComponent, canActivate: [AuthGuard]},
    {path: 'edit/:productId', component: CreateProductsComponent , canActivate: [AuthGuard]},
    {path: 'create-categories', component: CategoriesComponent, canActivate: [AuthGuard]},
    {path: 'create-marka', component: MarkaComponent, canActivate: [AuthGuard]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})

export class CreateProductsRoutingModule { }
