import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})

export class ProductsCreateComponent implements OnInit {

  imagePreview;
  mode = 'create';
  private productId: string;

  profileForm = this.fb.group({
    category: ['', Validators.required],
    marka: ['', Validators.required],
    isim: ['', Validators.required],
    miktar: ['', Validators.required],
    aciklama: ['', Validators.required],
    fiyat: ['', Validators.required],
    indirim: [''],
    imagem:[''],
    renkler: this.fb.array([
      this.fb.control('')
    ])
  });
  authStatusSub: Subscription;
  loading = false;
  datas: { category: string, _id: string }[] = [];
  productCategorySub: Subscription;
  dataMarka: { marka: string, _id: string }[] = [];
  productMarkaSub: Subscription;

  get aliases() {
    return this.profileForm.get('renkler') as FormArray;
  }

  constructor(private fb: FormBuilder,
              public productsService: ProductsService,
              public route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatus()
      .subscribe(authStatus => {
        this.loading = false;
      });

    this.productCategorySub = this.productsService.getCategory().subscribe(res => {
        return this.datas.push(...res);
      });

    this.productMarkaSub = this.productsService.getMarka().subscribe(res => {
      return this.dataMarka.push(...res);
    });
  }

  updateProfile() {
    this.profileForm.patchValue({
      category: 'Nancy',
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({ imagem: file });
    this.profileForm.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    if (this.profileForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.productsService.addProduct(
        this.profileForm.value.category, this.profileForm.value.isim, this.profileForm.value.marka,
        this.profileForm.value.fiyat, this.profileForm.value.miktar, this.profileForm.value.aciklama,
        this.profileForm.value.indirim, this.profileForm.value.renkler,
        this.profileForm.value.imagem);
    } else {
      this.productsService.updateProduct(
        this.productId, this.profileForm.value.category, this.profileForm.value.isim, this.profileForm.value.marka,
        this.profileForm.value.fiyat, this.profileForm.value.miktar, this.profileForm.value.aciklama,
        this.profileForm.value.indirim, this.profileForm.value.renkler,
        this.profileForm.value.imagem, '');
    }
    this.profileForm.reset();

  }

}
