import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AdresKart } from '../../adresvekart.service';
import { Adres } from '../../adres.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kayitli',
  templateUrl: './kayitli.component.html',
  styleUrls: ['./kayitli.component.css']
})

export class KayitliComponent implements OnInit, OnDestroy {

  @Output() showViso =  new EventEmitter<boolean> ();
  @Output() detailAdresim =  new EventEmitter<string> ();
  @Output() editUpdate = new EventEmitter<boolean> ();
  @Output() userAdres = new EventEmitter<string> ();
  adresler: Adres[] = [];
  private adresSub: Subscription;

  constructor(private adresService: AdresKart) { }

  ngOnInit() {
    this.adresService.getAdres();
    this.adresSub = this.adresService.getAdresUpdated()
      .subscribe((adresler: Adres[]) => {
        this.adresler = adresler;
    });
  }

  ngOnDestroy() {
    this.adresSub.unsubscribe();
  }

  adresDelete(id: string) {
    this.adresService.deleteAdresim(id);
  }

  adresGetir(id: string) {
    this.showViso.emit(true);
    this.editUpdate.emit(true);
    return this.detailAdresim.emit(id);
  }

  radioChangeHandler(event: any) {
    this.userAdres.emit(event.target.value);
  }


}
