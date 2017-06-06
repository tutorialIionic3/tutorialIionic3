import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detallenota',
  templateUrl: 'detallenota.html',
})
export class Detallenota {
  titulo: string;
  contenido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.titulo = this.navParams.get('titulo');
    this.contenido = this.navParams.get('contenido');
  }
}