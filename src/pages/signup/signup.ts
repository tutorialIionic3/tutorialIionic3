import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserModel } from '../../models/user-model';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
    userModel: UserModel;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
        public authService: AuthService) {
        this.userModel = new UserModel();
    }
    signup() {
        let loading = this.loadingCtrl.create({
            content: 'Creando cuenta. Por favor, espere...'
        });
        loading.present();

        this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
            loading.dismiss();
            firebase.database().ref('/users/').child(result.uid).set({
                email: result.email,
                notas: {
                    Hola:{
                        titulo:"Hola",
                        cuerpo:"Esta es mi primera nota"
                    }
                }
            });
            this.navCtrl.push('Login');
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'La cuenta ya existe. Por favor inténtelo nuevamente.');
        });
    }
    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
}