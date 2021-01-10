import { Component, OnInit, Input } from '@angular/core';
import { DetailP } from '../detail-product.model';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  @Input () urunAci: DetailP;

  constructor() { }

  ngOnInit() {
  }

}
