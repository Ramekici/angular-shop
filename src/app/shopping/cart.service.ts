import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { DetailP } from './detail-product/detail-product.model';
import { environment } from '../../environments/environment';
const backendUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  private payload: any = [];
  private cartsUpdated = new Subject<any[]>();

  getCart() {
    return this.payload;
  }

  getCartsUpdated() {
    return this.cartsUpdated.asObservable();
  }

  updateCartQuantity(id: string, count: number) {
    const miktar = {quantity: count};
    if (this.authService.getIsAuth()) {
      this.http
        .put <{ message: string }>(backendUrl + '/profiles/cart/' + id, miktar)
        .subscribe(resp => {
          this.getCartProducts();
      });
    } else {
      const items = this.payload.find(item => item.productId === id);
      items.quantity = count;
      const newPayload = this.payload.filter(item => item.productId !== id);
      newPayload.push(items);
      this.payload = newPayload;
      this.cartsUpdated.next([...newPayload]);
    }

  }


  addCartMongo(prod: DetailP, count: number, renk: string ) {
    const product = ({
      productId: prod.id,
      fiyat: prod.fiyat,
      renk: renk ? renk : prod.renk.renk1,
      image: prod.imagePath,
      name: prod.isim,
      quantity: count
    });
    if (this.authService.getIsAuth()) {
      this.http
        .post <{ message: string }>(backendUrl + '/profiles/cart', product)
        .subscribe(resp => {
      });
    } else {
      this.payload.push(product);
      this.cartsUpdated.next([...this.payload]);
  }}

  getCartProducts() {
    this.http
      .get<{ message: string, cart: any }>(backendUrl + '/profiles/cart')
      .pipe(map((productData) => {
        return productData.cart.map(prod => {
          return {
            id: prod._id,
            productId: prod.productId,
            fiyat: prod.fiyat,
            image: prod.image,
            name: prod.isim,
            quantity: prod.quantity,
            renk: prod.renk
          };
        });
      }))
      .subscribe( transformedProduct => {
        this.payload = transformedProduct;
        this.cartsUpdated.next([...this.payload]);
      });
  }

  deleteCartMongo(id: string) {
      if (this.authService.getIsAuth()) {
        this.http
          .delete(backendUrl + '/profiles/cart/' + id)
          .subscribe(resp => {
            this.getCartProducts();
          });
      } else {
        const updatedProducts = this.payload.filter(product => product.productId !== id);
        this.payload = updatedProducts;
        this.cartsUpdated.next([...this.payload]);
      }
  }

  deleteAllCart() {
    if (this.authService.getIsAuth()) {
      this.http
        .delete(backendUrl + '/profiles/cart')
        .subscribe(resp => {
          this.getCartProducts();
    });
    }
}

}
