import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../create-products/products.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../../account/wishlist.service';
import { Urun } from './product.model';
import { DetailP } from '../detail-product/detail-product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', './theme.component.css']
})
export class ProductsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() productsPerPage: number;
  @Input() currentPage: number;
  products: DetailP[] = [];
  isShow = false;
  id: string;
  totalProducts: number;
  private productsSub: Subscription;
  isLoading = false;
  payload: any[];
  date = Number(new Date());



  constructor( public productsService: ProductsService,
               public cartService: CartService,
               public wishListService: WishlistService) {}


  onMouseOver(idm: string) {
    this.isShow = true;
    this.id = idm;
  }

  onMouseOut(idm: string) {
    this.isShow = false;
    this.id = idm;
  }

  ngOnInit() {
    console.log(this.date);
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.payload = this.cartService.getCart();
    this.isLoading = true;
    this.productsSub = this.productsService.getProductsUpdated()
    .subscribe((productData: {products: DetailP[], productsMiktar: number}) => {
        this.products = productData.products;
        this.isLoading = false;
    });
  }

  ngOnChanges() {
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }


  onAddToCarts(product: DetailP, count: number, renk: string) {
    let inCart = false;
    if (this.payload.length > 0) {
      this.payload.map(prd => {
        if (prd.productId === product.id) {
          return (inCart = true);
        }
      });
      if (!inCart) {
        this.cartService.addCartMongo(product, count, renk);
      }
    } else {
      this.cartService.addCartMongo(product, count, renk);
    }
  }

  onAddToWishList(product: Urun) {
    this.wishListService.onAddToWishList(product);
  }

  onWievProduct(productId: string) {
    this.productsService.getProductDetail(productId);
  }
}
