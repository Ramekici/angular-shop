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
  datas:{marka: string, _id: string}[] =[];
  constructor(private ProductService : ProductsService) { }

  ngOnInit() {
    this.form =  new FormGroup({
      marka: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    });
    this.ProductService.getMarka().subscribe(res => {
        return this.datas.push(...res);
    })
  }

  onAddMarka = () =>{
    this.ProductService.addMarka(this.form.value.marka).subscribe(res => {
      this.datas.push({marka: this.form.value.marka, _id: Date.now().toString()})
    })
  }

  onDelete = (id: string)=> {
    this.ProductService.deleteCategory(id).subscribe(res => {
      const index = this.datas.findIndex(item => item._id === id);
      return this.datas.splice(index, 1);
    })
  }


}
