import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../products.service';



@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',

})
export class ListeComponent implements OnInit, OnDestroy {
  @Input() datas: {category: string, _id: string}[];
  constructor(private ProductService: ProductsService) {

  }
  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onDeleteItem(id: string) {
    this.ProductService.deleteCategory(id).subscribe(res => {
      const index = this.datas.findIndex(item => item._id === id);
      return this.datas.splice(index, 1);
    });
  }


}
