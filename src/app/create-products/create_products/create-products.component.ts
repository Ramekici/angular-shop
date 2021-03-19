import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DetailP } from '../../shopping/detail-product/detail-product.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit, OnDestroy {

  mode = 'create';
  private productId: string;
  imagePreview;
  loading = false;
  form: FormGroup;
  product: DetailP;
  private authStatusSub: Subscription;
  private productCategorySub: Subscription;
  private productMarkaSub: Subscription;

  //private datas = new Subject<{ category: string, _id: string}[]>();

  datas: { category: string, _id: string }[] = [];
  dataMarka: { marka: string, _id: string }[] = [];

  constructor(public productsService: ProductsService, public route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatus()
      .subscribe(authStatus => {
        this.loading = false;
      });
    this.form = new FormGroup({
      sektor: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      isim: new FormControl(null, { validators: [Validators.required] }),
      marka: new FormControl(null, { validators: [Validators.required] }),
      fiyat: new FormControl(null, { validators: [Validators.required] }),
      miktar: new FormControl(null, { validators: [Validators.required] }),
      aciklama: new FormControl(null, { validators: [Validators.required] }),
      indirim: new FormControl(null),
      renk: new FormGroup({
        renk1: new FormControl(null),
        renk2: new FormControl(null),
        renk3: new FormControl(null)
      }),
      imagem: new FormControl(null, { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.productsService.getProductOne(this.productId).subscribe(productData => {
          this.product = {
            id: productData._id, category: productData.sektor,
            isim: productData.isim, marka: productData.marka,
            fiyat: productData.fiyat, miktar: productData.miktar,
            aciklama: productData.aciklama, indirim: productData.indirim,
            renk: {
              renk1: productData.renk.renk1,
              renk2: productData.renk.renk2,
              renk3: productData.renk.renk3
            },
            imagePath: productData.imagePath,
            date: null,
            yorumlar: null
          };
          this.form.setValue({
            sektor: this.product.category, isim: this.product.isim, marka: this.product.marka,
            fiyat: this.product.fiyat, miktar: this.product.miktar,
            aciklama: this.product.aciklama, indirim: this.product.indirim,
            renk: {
              renk1: this.product.renk.renk1,
              renk2: this.product.renk.renk2,
              renk3: this.product.renk.renk3
            },
            imagem: this.product.imagePath
          }
          );
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });

    this.productCategorySub = this.productsService.getCategory().subscribe(res => {
      return this.datas.push(...res);
    });
    this.productMarkaSub = this.productsService.getMarka().subscribe(res => {
      return this.dataMarka.push(...res);
    });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.productCategorySub.unsubscribe();
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagem: file });
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddUpdateProduct() {
    // if (this.form.invalid) {
    //   return;
    // }
    // if (this.mode === 'create') {
    //   this.productsService.addProduct(this.form.value.sektor, this.form.value.isim, this.form.value.marka,
    //     this.form.value.fiyat, this.form.value.miktar, this.form.value.aciklama, this.form.value.indirim, this.form.value.renk.renk1,
    //     this.form.value.renk.renk2, this.form.value.renk.renk3,
    //     this.form.value.imagem);
    // } else {
    //   this.productsService.updateProduct(this.productId, this.form.value.sektor, this.form.value.isim, this.form.value.marka,
    //     this.form.value.fiyat, this.form.value.miktar, this.form.value.aciklama, this.form.value.indirim, this.form.value.renk.renk1,
    //     this.form.value.renk.renk2, this.form.value.renk.renk3,
    //     this.form.value.imagem, null);
    // }
    // this.form.reset();
  }



}
