import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../create-products/products.service';
import { CartService } from '../shopping/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub: Subscription;
  cartProducts: any = [];
  adet: number;
  sayı: string;
  showMenu = false;
  modalStatus = false;
  userId: string;

  constructor(private authService: AuthService, public productService: ProductsService,
              public cartService: CartService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatus()
    .subscribe(isAuth => {
      this.userIsAuthenticated = isAuth;
      this.userId = this.authService.getUserId();
    });
    this.cartProducts = this.cartService.getCart();
    if (this.cartProducts.length > 0) {
      this.cartProducts.map(pr => {
        this.adet = this.adet + pr.quantity;
        return this.sayı = this.adet.toString();
      });
    }
  }

  changeMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  onChangeModal() {
    this.productService.onChangeModal();
  }


}
