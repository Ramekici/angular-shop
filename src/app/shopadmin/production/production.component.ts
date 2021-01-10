import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../create-products/products.service';
import { CartService } from '../../shopping/cart.service';
import { DetailP } from 'src/app/shopping/detail-product/detail-product.model';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit, OnDestroy {
  isLoading = false;
  products: DetailP[] = [];
  private productsSub: Subscription;
  constructor( public productsService: ProductsService, public cartService: CartService) {
  }

  ngOnInit() {
    this.productsService.getProducts(10, 1);
    this.productsSub = this.productsService.getProductsUpdated()
    .subscribe((productData: {products: DetailP[], productsMiktar: number}) => {
        this.products = productData.products;
    });
  }
  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

  onDeleteProduct(id: string) {
    this.isLoading = true;
    this.productsService.deleteProduct(id).subscribe(() => {
      this.productsService.getProducts(10, 1);
      this.isLoading = false;
    }
    );
  }

}
