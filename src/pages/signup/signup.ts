import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface UserDetail {
  name: string;
  college_id: string;
  room_number: string;
  mobile_number: number;
 }

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email:string;
  password:string;
  name: string;
  college_id: string;
  room_number: string;
  mobile_number: number;

  private userProfile: AngularFirestoreCollection<UserDetail>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private auth: AuthService) {
    this.userProfile = afs.collection<UserDetail>('user-profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToSigninPage()
  {
    this.navCtrl.setRoot(LoginPage);
  }

  verifyandregister()
  {
    if( !this.email ||
        !this.password ||
        !this.name ||
        !this.college_id ||
        !this.room_number ||
        !this.mobile_number )
    {console.log("poora bharo");
    alert("Please fill all the details correctly");}
    else
    this.register();
  }

  register()
  {
    let credentials = {
			"email": this.email,
			"password": this.password
		};
    this.auth.signUp(credentials)
    .then(user=>{
  const id=user.uid;
  
  const name:string = this.name;
  const college_id:string = this.college_id
  const room_number:string = this.room_number;
  const mobile_number:number = this.mobile_number;
  
  console.log(id)
  const userDetail: UserDetail = {name:name,college_id:college_id,room_number:room_number,mobile_number:mobile_number}
  this.userProfile.doc(id).set(userDetail)
  .then(
    () => this.navCtrl.setRoot(LoginPage),
    error => console.log(error.message)
  )
  .catch(error => console.log(error.message));
})
.catch(error => console.log(error.message))
  }

}
