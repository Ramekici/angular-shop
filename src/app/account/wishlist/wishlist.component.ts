import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Urun } from 'src/app/shopping/products/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public wishList: Urun[] = [];
  constructor(public wishListService: WishlistService) { }

  ngOnInit() {
    this.wishList = this.wishListService.getWishList();
  }





}
