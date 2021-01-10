import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/create-products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  modalPosit: Subscription;
  modalPos = false;

  displayed = this.modalPos ? 'inline-block' : 'none';
  constructor(public productService: ProductsService) { }

  ngOnInit() {
    this.modalPosit = this.productService.getModalPosUpdated()
    .subscribe( (resp: boolean) => {
      this.modalPos = resp;
    });
  }
  ngOnDestroy() {
    this.modalPosit.unsubscribe();

  }




  onCloseModal() {
    this.productService.onChangeModal();
  }

}
