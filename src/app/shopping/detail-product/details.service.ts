import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private yorumlar: any[] = [];
  private yorumlarUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  addYorum( urunId: string, yorumBaslik: string, yorumMetni: string, puan: number) {
    const yorum = { yorumBaslik, yorumMetni, puan };
    console.log(yorum);
    this.http
      .post <{ message: string }>('http://localhost:3000/api/products/yorum/' + urunId, yorum)
      .subscribe(resp => {
        this.yorumlar.push(yorum);
        this.yorumlarUpdated.next([...this.yorumlar]);
      });
  }
}
