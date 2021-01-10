import { Component } from '@angular/core';


@Component({
  selector: 'app-odemetipi',
  templateUrl: './odemetipi.component.html',
  styleUrls: ['./odemetipi.component.css']
})
export class OdemetipiComponent {
  userOdeme = '';
  radioChangeHandler(event: any) {
    this.userOdeme = event.target.value;
  }

}
