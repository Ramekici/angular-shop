import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {

  showFilter = false;
  dropPos = false;
  sortVal: string;
  sortDatam: Array<any> = [
    { name: 'popularite', value: 'popular' },
    { name: 'en yenisi', value: 'newest' },
    { name: 'artan', value: 'increased' },
    { name: 'azalan', value: 'decreased' }
  ];

  ngOnInit() {
  }


  onShowFilter() {
    this.showFilter = !this.showFilter;
  }
  sirala() {
    this.dropPos = !this.dropPos;
  }
  sortValue(event: any) {
    this.sortVal = event.target.value;
  }

}
