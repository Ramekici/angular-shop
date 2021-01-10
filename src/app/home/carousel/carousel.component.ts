import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  index = 0;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      if (this.index === 2) {
        this.index  = 0;
      } else if (this.index < 2) {
        this.index += 1;
      }}, 10000);
  }

  onNext() {
    if (this.index === 2) {
      this.index  = 0;
    } else if (this.index < 2) {
      this.index += 1;
    }
  }

  onBack() {
    if (this.index === 0) {
      this.index = 2;
    } else if (this.index < 3) {
      this.index -= 1;
    }
  }
}
