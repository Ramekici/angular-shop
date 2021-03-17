import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-marka',
  templateUrl: './marka.component.html',
  styleUrls: ['./marka.component.css']
})
export class MarkaComponent implements OnInit {

  form: FormGroup;
  datas:{category: string, _id: string}[] =[];
  constructor(private ProductService : ProductsService) { }

  ngOnInit() {
    this.form =  new FormGroup({
      marka: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    });
    this.ProductService.getCategory().subscribe(res => {
        return this.datas.push(...res);
      }
    )
  }

  onAddMarka = () =>{
    this.ProductService.addCategory(this.form.value.marka)
  }

  onDelete = (id: string)=> {
    this.ProductService.deleteCategory(id);
  }


}
