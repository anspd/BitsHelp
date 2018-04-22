import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
/**
 * Generated class for the AskhelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Items {
  name: string;
  college_id: string;
  room_number: string;
  mobile_number: number;
  service_details: string;
  from_place: string;
  to_place: string;
  created_at: Date;
  created_by : string;
  accepted_by: string;
}

export interface ProfileItem {
  name: string;
  college_id: string;
  room_number: string;
  mobile_number: number;
}


@Component({
  selector: 'page-askhelp',
  templateUrl: 'askhelp.html',
})



export class AskhelpPage {

  service_details: string;
  to_place: string;
  from_place: string;

  feedsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  //helplend: AngularFirestoreCollection<Items>; //Firestore collection
   items: Observable<Items[]>; // read collection

  private profile:AngularFirestoreDocument<ProfileItem>;
  profileObject:Observable<ProfileItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private auth: AuthService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskhelpPage');
    this.profile=this.afs.doc<ProfileItem>('user-profile/'+this.auth.getUid());
    console.log("chala")
    this.profileObject = this.profile.valueChanges();
    this.feedsCollection = this.afs.collection('feeds'); //ref()
    this.items = this.feedsCollection.valueChanges()
  }

  submit()
  {
    console.log(this.profileObject)
    const name:string = "asd"//this.profileObject.name;
    const college_id:string = "asd"//this.profileObject[0].college_id;
    const room_number:string = "R324"//this.profileObject[0].room_number;
    const mobile_number:number = 5435//this.profileObject[0].mobile_number;
    const service_details:string = this.service_details;
    const to_place: string = this.to_place;
    const from_place: string = this.from_place;
    const created_at = new Date();
    const created_by: string = this.auth.getUid(); 
    const accepted_by: string = null;
  
    const item: Items = {name:name,college_id:college_id,room_number:room_number,mobile_number:mobile_number,service_details:service_details,
                        to_place:to_place,from_place:from_place,created_at:created_at,created_by:created_by,accepted_by:accepted_by}
    this.feedsCollection.add(item)
    .then( () => this.navCtrl.setRoot(HomePage),
    error => console.log(error.message)
  )
    .catch( (error) => {
        console.error("Error adding document: ", error);
    });
  }

}
