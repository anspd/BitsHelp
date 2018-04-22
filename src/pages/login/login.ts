
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		
	) {
    
  }
    email: string;
    password: string;

    verifyandlogin()
    {
      if(!this.email || !this.password)
      alert("Email or Password Incorrect");
      else
      this.login();
    }
  
  login() {

    console.log("aaya");

				if (!this.email) {
			return;
		}

		let credentials = {
			email: this.email,
			password: this.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => console.log(error.message)
			);
}

goToSignupPage()
  {
    this.navCtrl.setRoot(SignupPage);
  }

}