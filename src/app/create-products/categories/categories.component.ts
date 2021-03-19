import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  form: FormGroup;
  datas: {category: string, _id: string}[] = [];
  constructor(private ProductService: ProductsService) { }
  private getCatSub: Subscription;


  ngOnInit() {
    this.form =  new FormGroup({
      category: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    });
    this.getCatSub = this.ProductService.getCategory().subscribe(res => {
        return this.datas.push(...res);
      }
    );
  }

  onAddCategories = () => {
    this.ProductService.addCategory(this.form.value.category).subscribe(resp => {
      this.datas.push({category: this.form.value.category, _id: resp.toString()});
      this.form.reset();
    });
  }



  ngOnDestroy() {
    this.getCatSub.unsubscribe();
  }
}
