import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { AdresKart } from '../adresvekart.service';
import { Adres } from '../adres.model';
const backendUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {

  constructor(private route: Router, private http: HttpClient,
              public cartService: CartService, public adresService: AdresKart) { }
  modalOpen = false;
  private adSoyad: string;
  private kartNo: number;
  private adresSelected: Adres;


  openModal() {
    this.modalOpen = !this.modalOpen;
  }

  onSubmitKrediKart(ad: string, kart: number) {
    this.adSoyad = ad;
    this.kartNo = kart;
  }

  onSubmitAdres(idAdres: string) {
    this.adresSelected = this.adresService.getAdresDetail(idAdres);
  }

  onSendOrder() {
    const order = {
      tcNo: this.adresSelected.tcNo,
      adresTanim: this.adresSelected.adresTanim,
      acikAdres: this.adresSelected.acikAdres1,
      acikAdres2: this.adresSelected.acikAdres2,
      ilce: this.adresSelected.ilce,
      il: this.adresSelected.il,
      telefon: this.adresSelected.telefon,
      adSoyad: this.adSoyad,
      kartNumarasi: this.kartNo,
      firma: '...',
      ucret: 122222,
      urunlerim: this.cartService.getCart().map(urun => {
        return {
          urun_id: urun.productId,
          marka: urun.name,
          renk: urun.renk,
          fiyat: urun.fiyat,
          miktar: urun.quantity,
          toplam: urun.fiyat * urun.quantity};
      })
    };
    this.http
      .post <{ message: string, order: any }>(backendUrl + '/orders', order)
      .subscribe (resp => {
        this.cartService.deleteAllCart();
        this.route.navigate(['/checkout/orders']);
    });
  }




}
