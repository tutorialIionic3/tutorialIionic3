import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Login } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
  notas: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public authService: AuthService, public af: AngularFireDatabase) {
    this.notas = this.af.list('/users/'+firebase.auth().currentUser.uid+'/notas/');
  }

  login() {
    this.navCtrl.setRoot(Login);
    this.authService.signOut();
  }

  removeNota(nota: string){
    this.af.list('/users/'+firebase.auth().currentUser.uid+'/notas/'+nota).remove();
  }

  editNota(nota: string, contenido: string){
    let alert = this.alertCtrl.create({
      title: 'Editar '+nota,
      inputs: [
        {
          name: 'cuerpo',
          placeholder: 'Contenido',
          value: contenido
        }
      ],
      buttons: [
        {
          text: 'Guardar',
          role: 'Guardar',
          handler: data => {
            firebase.database().ref('/users/'+firebase.auth().currentUser.uid+'/notas/').child(nota).set({
                titulo: nota,
                cuerpo: data.cuerpo
            });
          }
        }
      ]
    });
    alert.present();
  }

  addNota(){
    let alert = this.alertCtrl.create({
      title: 'Nueva Nota',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Título'
        },
        {
          name: 'cuerpo',
          placeholder: 'Contenido',
        }
      ],
      buttons: [
        {
          text: 'Añadir',
          role: 'Añadir',
          handler: data => {
            firebase.database().ref('/users/'+firebase.auth().currentUser.uid+'/notas/').child(data.titulo).set({
                titulo: data.titulo,
                cuerpo: data.cuerpo
            });
          }
        }
      ]
    });
    alert.present();
  }

  openNota(titulo: string, contenido: string){
    this.navCtrl.push('Detallenota', {'titulo':titulo, 'contenido':contenido});
  }

}