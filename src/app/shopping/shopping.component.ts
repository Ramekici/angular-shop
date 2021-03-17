import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../create-products/products.service';
import { Subscription } from 'rxjs';
import { DetailP } from './detail-product/detail-product.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['../shopping/products/theme.component.css']
})


export class ShoppingComponent implements OnInit, OnDestroy {
  pageSize = 8;
  currentPage = 1;
  private productsSub: Subscription;

  valueNowi: number;
  valueMaxi: number;
  valueYuzde: number;
  constructor( public productsService: ProductsService) {}

  ngOnInit() {
    this.productsSub = this.productsService.getProductsUpdated()
    .subscribe((productData: {products: DetailP[], productsMiktar: number}) => {
        this.valueMaxi = productData.productsMiktar;
        this.valueNowi = (this.pageSize * this.currentPage > this.valueMaxi) ? this.valueMaxi : this.pageSize * this.currentPage;
        this.valueYuzde = (this.valueNowi / this.valueMaxi) * 100;
    });
  }
  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

  onChangeNext() {
    this.currentPage = this.currentPage + 1;
  }
  onChangeBack() {
    this.currentPage = this.currentPage - 1;
  }


}
