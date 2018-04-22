import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
	private user: firebase.UserInfo;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
            this.user = user;
            console.log(user.email)
		});
    }

    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

    
   	get authenticated(): boolean {
        return this.user !== null;
      }

      getEmail() {
        return this.user && this.user.email;
      }

      getUid() {
          return this.user.uid;
      }

      signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
      }

}