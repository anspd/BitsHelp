import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../services/auth.service';
import { AskhelpPage } from '../pages/askhelp/askhelp';


import * as firebase from 'firebase/app';
import { HelprequestedPage } from '../pages/helprequested/helprequested';
import { HelpacceptedPage } from '../pages/helpaccepted/helpaccepted';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Help Feeds', component: HomePage },
      { title: 'Create a Help Feed', component: AskhelpPage },
      { title: 'Help Requested', component: HelprequestedPage },
      { title: 'Help Accepted', component: HelpacceptedPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    firebase.firestore().settings({timestampsInSnapshots:true});
    });


  this.auth.afAuth.authState
  .subscribe(
    user => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    },
    () => {
      this.rootPage = LoginPage;
    }
);

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }
}
