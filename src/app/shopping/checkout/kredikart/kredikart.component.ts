import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-kredikart',
  templateUrl: './kredikart.component.html',
  styleUrls: ['./kredikart.component.css']
})
export class KredikartComponent implements OnInit, DoCheck {

  @Input () odemetipi: string;

  krediKart = new FormGroup({
    kartNumarasi : new FormControl('', Validators.required),
    adSoyad : new FormControl(''),
    sonKullnmaAy : new FormControl(''),
    sonKullnmaYil : new FormControl(''),
    cvv : new FormControl('')
  });

  showKrediKart = '';
  constructor(public checkoutService: CheckoutService) { }

  ngOnInit() {
    if (this.odemetipi === 'kredi') {
      this.showKrediKart = 'show';
    } else {
      this.showKrediKart = '';
    }
  }
  ngDoCheck() {
    if (this.odemetipi === 'kredi') {
      this.showKrediKart = 'show';
    } else {
      this.showKrediKart = '';
    }
  }
  onSubmit() {
    this.checkoutService.onSubmitKrediKart(this.krediKart.value.adSoyad,
      this.krediKart.value.kartNumarasi);
  }

}
