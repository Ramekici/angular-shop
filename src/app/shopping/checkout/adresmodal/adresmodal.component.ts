import { Component, Input, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AdresKart } from '../../adresvekart.service';
import { Adres } from '../../adres.model';

@Component({
  selector: 'app-adresmodal',
  templateUrl: './adresmodal.component.html',
  styleUrls: ['./adresmodal.component.css']
})
export class AdresmodalComponent implements OnInit, DoCheck {

  @Input() showVis: boolean;
  @Input() updateAdres: boolean;
  @Input() idm: string;
  @Output() unShowed = new EventEmitter<boolean>();
  shw = '';
  adresDetail: Adres = { id: null, ad: null, soyad: null,
    adresTanim: null, tcNo: null, acikAdres1: null,
    acikAdres2: null, ilce: null, il: null, telefon: null, postaKodu: null
  };
  constructor(private adresService: AdresKart) { }

  adresEkle(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }
    if (this.updateAdres) {
      this.adresService.updateAdres(this.idm, forma.value.ad, forma.value.soyad, forma.value.adresTanim,
        forma.value.tcNo, forma.value.acikAdres1, forma.value.acikAdres2,
        forma.value.ilce, forma.value.il, forma.value.telefon, forma.value.postaKodu);
      this.updateAdres = false;
    } else {
      this.adresService.addAdres(null, forma.value.ad, forma.value.soyad, forma.value.adresTanim,
      forma.value.tcNo, forma.value.acikAdres1, forma.value.acikAdres2,
      forma.value.ilce, forma.value.il, forma.value.telefon, forma.value.postaKodu);
    }
    forma.resetForm();
  }

  ngOnInit() {
    this.adresService.getAdresDetail(this.idm);
    this.shw = this.showVis ? 'show' : '';
    this.adresDetail = this.adresService.getAdresDetails();
  }

  ngDoCheck() {
    this.adresService.getAdresDetail(this.idm);
    this.shw =  this.showVis ? 'show' : '';
    this.adresDetail = this.adresService.getAdresDetails();
  }

  closeModal() {
    this.showVis = false;
    this.unShowed.emit(false);
  }

}
