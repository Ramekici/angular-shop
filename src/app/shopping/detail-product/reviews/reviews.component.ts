import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DetailsService } from '../details.service';
import { DetailP } from '../detail-product.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input () urunAcikla: DetailP;
  @Input () isAuth: boolean;

  starValue: number;
  showYorum = false;
  private productId: string;
  starValues = [1, 2, 3, 4, 5];
  yorumBaslik = new FormControl('');
  yorumMetni = new FormControl('');


  constructor(private detailSrvice: DetailsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = paramMap.get('productId');
    });

  }

  onStarValue(e: any) {
    this.starValue = e.target.value;
  }

  yorumHandler() {
    this.detailSrvice.addYorum(this.productId, this.yorumBaslik.value, this.yorumMetni.value, this.starValue);
  }

  changeHandler() {
    this.showYorum = !this.showYorum;
  }





}
