import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  form: FormGroup;
  datas:{category: string, _id: string}[] =[];
  constructor(private ProductService : ProductsService) { }

  ngOnInit() {
    this.form =  new FormGroup({
      category: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    });
    this.ProductService.getCategory().subscribe(res => {
      console.log(res);
        return this.datas.push(...res);
      }
    )
  }

  onAddCategories = () =>{
    this.ProductService.addCategory(this.form.value.category)
  }

  onDelete = (id: string)=> {
    this.ProductService.deleteCategory(id);
  }


}
