import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, Promise } from 'firebase/app';
import { UserModel } from '../../models/user-model';

@Injectable()
export class AuthService {
    user: User;

    //Recibimos el usuario y lo igualamos a la variable global de la clase.
    constructor(public angularFireAuth: AngularFireAuth) {
        angularFireAuth.authState.subscribe((user: User) => {
            this.user = user;
        });
    }
    //Obtenemos el usuario con sesión iniciada.
    get authenticated(): boolean {
        return this.user != null;
    }
    //Iniciamos sesión de un usuario.
    signInWithEmailAndPassword(userModel: UserModel): Promise<any> {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
    }
    //Creamos un usuario.
    createUserWithEmailAndPassword(userModel: UserModel): Promise<any> {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
    }
    //Cerramos una sesión.
    signOut(): Promise<any> {
        return this.angularFireAuth.auth.signOut();
    }
}