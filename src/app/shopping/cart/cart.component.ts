import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { Product } from '../../create-products/create-product.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../products/theme.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(public cartService: CartService, private authService: AuthService) { }
  cartProducts: any = [];
  total = 0;
  tax = 0;
  subtotal = 0;
  products: Product[] = [];
  adet: number;
  private cartsSub: Subscription;


  ngOnInit() {
    if (this.authService.getIsAuth()) {
      this.cartService.getCartProducts();
      this.cartsSub = this.cartService.getCartsUpdated()
        .subscribe((products: any[]) => {
          this.cartProducts = products;
          this.total = 0;
          this.cartProducts.map(p => {
            return this.total = this.total + (p.fiyat * p.quantity);
          });
          this.tax = (this.total * 18 ) / 100;
          this.subtotal = this.total - this.tax;
        });
    } else {
      this.cartProducts = this.cartService.getCart();
      this.cartsSub = this.cartService.getCartsUpdated()
        .subscribe((products: any[]) => {
          this.cartProducts = products;
          this.total = 0;
          this.cartProducts.map(p => {
            return this.total = this.total + (p.fiyat * p.quantity);
          });
          this.tax = (this.total * 18 ) / 100;
          this.subtotal = this.total - this.tax;
      });

    }

  }

  onDeletedCart(productId: string) {
    this.cartService.deleteCartMongo(productId);
  }

  onSetMiktar(id: string, miktar: number) {
    this.cartService.updateCartQuantity(id, miktar);
  }

  selectMiktar(event: any, id: string) {
    this.adet = event.target.value;
    this.cartService.updateCartQuantity(id, this.adet);
  }
  ngOnDestroy() {
    this.cartsSub.unsubscribe();
  }


}
