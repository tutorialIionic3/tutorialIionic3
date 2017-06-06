import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Detallenota } from './detallenota';

@NgModule({
  declarations: [
    Detallenota,
  ],
  imports: [
    IonicPageModule.forChild(Detallenota),
  ],
  exports: [
    Detallenota
  ]
})
export class DetallenotaPageModule {}
