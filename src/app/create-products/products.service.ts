import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient  } from '@angular/common/http';
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';
import { DetailP } from '../shopping/detail-product/detail-product.model';
import { environment } from '../../environments/environment';
const backendUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient, private router: Router) { }

  private products: DetailP[] = [];
  private detailProduct: DetailP;
  private productsUpdated = new Subject<{products: DetailP[], productsMiktar: number }>();
  private modalStatus = false;
  private modal = new Subject<boolean>();

  getModalPosUpdated() {
    return this.modal.asObservable();
  }

  onChangeModal() {
    this.modalStatus = !this.modalStatus;
    this.modal.next(this.modalStatus);
  }

  getDetailProduct() {
    return this.detailProduct;
  }

  getProductsUpdated() {
    return this.productsUpdated.asObservable();
  }

  getProductDetail(id: string) {
    return this.detailProduct = {...this.products.find(p => p.id === id)};
  }

  getProductOne(id: string) {
    return this.http.get<{ _id: string, sektor: string, isim: string, marka: string,
      fiyat: number, miktar: number, aciklama: string, indirim: number, renk: {renk1: string,
      renk2: string, renk3: string }, imagePath: string }>(backendUrl + '/products/' + id);
  }

  getProducts( pageSize: number, pageNumber: number ) {
    const queryParams = `?ps=${pageSize}&pg=${pageNumber}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(backendUrl + '/products' + queryParams)
      .pipe(map((productData) => {
        return { products: productData.products.map(prod => {
          return {
            id: prod._id,
            sektor: prod.sektor,
            isim: prod.isim,
            marka: prod.marka,
            fiyat: prod.fiyat,
            miktar: prod.miktar,
            aciklama: prod.aciklama,
            indirim: prod.indirim,
            renk: { renk1: prod.renk.renk1, renk2: prod.renk.renk2, renk3: prod.renk.renk3 },
            imagePath: prod.imagePath,
            date: Date.parse(prod.date),
            yorumlar: prod.yorumlar.map(yor => {
              return {
                baslik: yor.yorumBaslik, metin: yor.yorumMetni,
                puan: yor.puan, name: yor.name, date: yor.date
              };
            })
          };
        }), maxProducts: productData.maxProducts};
      }))
      .subscribe( transformedProduct => {
        this.products = transformedProduct.products;
        this.productsUpdated.next({products: [...this.products],
          productsMiktar: transformedProduct.maxProducts});
      });
  }

  addProduct( sektor: string, isim: string, marka: string,
              fiyat: number, miktar: number, aciklama: string, indirim: number,
              renk1: string, renk2: string, renk3: string, imagem: File | string) {
      const product = new FormData();
      product.append('sektor', sektor); product.append('isim', isim);
      product.append('marka', marka); product.append('fiyat', fiyat.toString());
      product.append('miktar', miktar.toString());
      product.append('aciklama', aciklama); product.append('indirim', indirim.toString());
      product.append('renk1', renk1); product.append('renk2', renk2);
      product.append('renk3', renk3); product.append('imagem', imagem, isim);
      this.http
      .post <{ message: string; product: DetailP }>(backendUrl + '/admin', product)
      .subscribe(resp => {
          this.router.navigate(['/']);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete(backendUrl + '/admin/' + productId);
  }

  updateProduct(id: string, sektor: string, isim: string, marka: string,
                fiyat: number, miktar: number, aciklama: string, indirim: number, renk1: string,
                renk2: string, renk3: string, imagem: File | string, yorumlar) {
                  let updateProduct;
                  if (typeof(imagem) === 'object') {
                    updateProduct = new FormData(); updateProduct.append('id', id);
                    updateProduct.append('sektor', sektor); updateProduct.append('isim', isim);
                    updateProduct.append('marka', marka); updateProduct.append('fiyat', fiyat.toString());
                    updateProduct.append('miktar', miktar.toString());
                    updateProduct.append('aciklama', aciklama); updateProduct.append('indirim', indirim.toString());
                    updateProduct.append('renk1', renk1); updateProduct.append('renk2', renk2);
                    updateProduct.append('renk3', renk3); updateProduct.append('imagem', imagem, isim);
                  } else {
                    updateProduct = { id, sektor, isim, marka, fiyat, miktar, aciklama,
                      indirim, renk: {renk1, renk2, renk3}, imagePath: imagem, yorumlar };
                  }
                  this.http
                  .put(backendUrl + '/admin/' + id, updateProduct)
                  .subscribe(response => {
                    this.router.navigate(['/']);
                });
  }





}
