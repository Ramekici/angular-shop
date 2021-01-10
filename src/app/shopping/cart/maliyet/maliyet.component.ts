import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maliyet',
  templateUrl: './maliyet.component.html',
  styleUrls: ['./maliyet.component.css']
})
export class MaliyetComponent implements OnInit {
  @Input() total: number;
  @Input() subTot: number;
  @Input() taxc: number;

  constructor() { }


  ngOnInit() {
  }

}
