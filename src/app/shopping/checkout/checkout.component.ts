import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';
import { CheckoutService } from './checkout.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', '../products/theme.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @Input() visible = false;
  adresId: string;
  selectedAdresId: string;
  isAuth = false;
  cartProducts: any = [];
  total = 0;
  tax = 0;
  subtotal = 0;
  updateAdres = false;
  private cartsSub: Subscription;
  orderDatam = new FormGroup({
    siparisNotu: new FormControl('')
  });
  constructor(private authService: AuthService, public cartService: CartService,
              public checkoutService: CheckoutService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth) {
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

  onShowed(vis: boolean) {
   this.visible = vis;
  }
  onUnShowed(vis: boolean) {
    this.visible = vis;
  }
  onShowDetail(id: string) {
    this.adresId = id;
  }
  onUpdate(upd: boolean) {
    this.updateAdres = upd;
  }
  toggle() {
    this.visible = this.visible === true ? false : true;
  }

  selectedAdres(e: any) {
    this.checkoutService.onSubmitAdres(e);
  }
  onOrderSend() {
    this.checkoutService.onSendOrder();
  }

  ngOnDestroy() {
    this.cartsSub.unsubscribe();
  }
}
