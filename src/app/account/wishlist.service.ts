import { Injectable } from '@angular/core';
import { Urun } from '../shopping/products/product.model';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  constructor() { }

  private wishList: Urun[] = [];

  getWishList() {
    return this.wishList;
  }

  onAddToWishList(product: Urun) {
    this.wishList.push(product);
  }
}
