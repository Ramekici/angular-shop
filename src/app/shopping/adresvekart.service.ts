import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Adres } from './adres.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdresKart {

  constructor(private http: HttpClient, private router: Router) { }
  private detailAdres: Adres;
  private adresler: Adres[] = [];
  private adresUpdated = new Subject<Adres[]>();

  getAdresler() {
    return this.adresler;
  }

  getAdresUpdated() {
    return this.adresUpdated.asObservable();
  }

  getAdresDetail(id: string) {
    return this.detailAdres = {...this.adresler.find(p => p.id === id)};
  }

  getAdresDetails() {
    return this.detailAdres;
  }

  addAdres( id: string, ad: string,
            soyad: string, adresTanim: string,
            tcNo: string, acikAdres1: string,
            acikAdres2: string, ilce: string,
            il: string, telefon: string,
            postaKodu: string ) {
    const adres: Adres = {id, ad, soyad, adresTanim, tcNo, acikAdres1,
      acikAdres2, ilce, il, telefon, postaKodu };
    this.http
      .post <{ message: string }>('http://localhost:3000/api/profiles/adres', adres)
      .subscribe(resp => {
      this.adresler.push(adres);
      this.router.navigate(['/checkout']);
      this.adresUpdated.next([...this.adresler]);
  });
  }

  getAdres() {
    this.http
      .get<{ message: string, profile: any }>('http://localhost:3000/api/profiles/adres')
      .pipe(map((adresData) => {
        return adresData.profile.map(prod => {
          return {
            id: prod._id, ad: prod.ad,
            soyad: prod.soyad, adresTanim: prod.adresTanim,
            tcNo: prod.tcNo, acikAdres1: prod.acikAdres1,
            acikAdres2: prod.acikAdres2, ilce: prod.ilce,
            il: prod.il, telefon: prod.telefon,
            postaKodu: prod.postaKodu
          };
        });
      }))
      .subscribe( transformedAdres => {
        this.adresler = transformedAdres;
        this.adresUpdated.next([...this.adresler]);
        console.log(this.adresler);
      });
  }

  updateAdres(id: string, ad: string,
              soyad: string, adresTanim: string,
              tcNo: string, acikAdres1: string,
              acikAdres2: string, ilce: string,
              il: string, telefon: string,
              postaKodu: string) {
              const adres: Adres = { id, ad, soyad, adresTanim, tcNo, acikAdres1,
              acikAdres2, ilce, il, telefon, postaKodu };
              this.http
                .put('http://localhost:3000/api/profiles/adres/' + id, adres)
                .subscribe(response => {
                  const updatedAdres = [...this.adresler];
                  const oldAdresIndex = updatedAdres.findIndex(p => p.id === id);
                  updatedAdres[oldAdresIndex] = adres;
                  this.adresler = updatedAdres;
                  this.adresUpdated.next([...this.adresler]);
              });
    }

  deleteAdresim(id: string) {
      this.http
      .delete('http://localhost:3000/api/profiles/adres/' + id)
      .subscribe(() => {
        const updatedAdres = this.adresler.filter(product => product.id !== id);
        this.adresler = updatedAdres;
        this.adresUpdated.next([...this.adresler]);
      });
    }
}





