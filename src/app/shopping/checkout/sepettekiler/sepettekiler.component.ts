import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sepettekiler',
  templateUrl: './sepettekiler.component.html',
  styleUrls: ['./sepettekiler.component.css']
})

export class SepettekilerComponent {

// tslint:disable-next-line: no-input-rename
@Input ('product') productEl: {
  id: string,
  isim: string,
  marka: string,
  fiyat: number,
  quantity: number,
  image: string,
  renk: string;
  indirim: number};
}
