import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../create-products/products.service';
import { CartService } from '../cart.service';
import { DetailP } from './detail-product.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  detailProduct: DetailP;
  isAuthenticated = false;
  productId: string;
  inStock = false;
  inCart = false;
  elemanYildiz = 0;
  ortPuan = 0;
  detailArray: Array<string> = [];
  detailArrayRenk: Array<string> = [];
  detailImage: string;
  choosenColor: string;
  constructor(public productService: ProductsService, public cartService: CartService,
              public route: ActivatedRoute, private autSer: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = paramMap.get('productId');
      this.detailProduct = this.productService.getProductDetail(this.productId);
    });
    if (this.detailProduct) {
      this.inStock = this.detailProduct.miktar > 0 ? true : false;
      this.detailProduct.yorumlar.map(yil => {
        this.elemanYildiz = (this.elemanYildiz + yil.puan);
      });
      this.ortPuan = this.detailProduct.yorumlar.length > 0 ?
      (this.elemanYildiz / this.detailProduct.yorumlar.length) : 0;
      this.detailArray = Object.values(this.detailProduct.imagePath);
      this.detailArrayRenk = Object.values(this.detailProduct.renk);
      this.detailImage = this.detailArray[0];
    }
    this.isAuthenticated = this.autSer.getIsAuth();
  }

  onSelectedImage(i: number) {
    this.detailImage = this.detailArray[i];
  }
  addColorToCart(e: any) {
    this.choosenColor = e.target.value;
  }


  onAddToCart(product: DetailP, count: number) {
    this.cartService.addCartMongo(product, count, this.choosenColor);
    this.inCart = true;
  }
  onDeleteFromSepet() {
    this.inCart = false;
  }

}
