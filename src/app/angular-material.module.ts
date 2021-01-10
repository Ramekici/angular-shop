import { NgModule } from '@angular/core';
import { MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatDialogModule } from '@angular/material';


@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]

})
export class AngularMaterialModule { }
