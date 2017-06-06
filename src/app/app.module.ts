import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth-service/auth-service';
import { Dashboard } from '../pages/dashboard/dashboard';

export const firebaseConfig = {
    apiKey: "tudato",
    authDomain: "tudato",
    databaseURL: "tudato",
    projectId: "tudato",
    storageBucket: "tudato",
    messagingSenderId: "tudato"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Dashboard
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Dashboard
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuthModule,
    AuthService
  ]
})
export class AppModule {}


