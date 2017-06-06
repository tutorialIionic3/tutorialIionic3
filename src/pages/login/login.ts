import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserModel } from '../../models/user-model';
import { Dashboard } from '../dashboard/dashboard'; //Mas adelante se solucionará

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class Login {
    userModel: UserModel;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
        public authService: AuthService) {
        this.userModel = new UserModel();
    }

    signin() {
        let loading = this.loadingCtrl.create({
            content: 'Iniciando sesión. Por favor, espere...'
        });
        loading.present();

        this.authService.signInWithEmailAndPassword(this.userModel).then(() => {
            loading.dismiss();

            this.navCtrl.setRoot(Dashboard);
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Correo o contraseña incorrectos. Por favor intentelo nuevamente.');
        });
    }

    signup() {
        this.navCtrl.push('Signup');
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