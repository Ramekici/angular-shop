import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdresKart } from '../../adresvekart.service';
import { Adres } from '../../adres.model';


@Component({
  selector: 'app-adresgir',
  templateUrl: './adresgir.component.html',
})

export class AdresgirComponent {

  adres: Adres;
  constructor(private adresService: AdresKart) { }

  onSubmitForm(form: NgForm) {
    this.adresService.addAdres(null, form.value.ad, form.value.soyad, form.value.adresTanim,
      form.value.tcNo, form.value.acikAdres1, form.value.acikAdres2, form.value.ilce, form.value.il,
      form.value.telefon, form.value.postaKodu);
  }


}
