import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';


/**
 * Generated class for the HelpacceptedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Item {
  id:string;
  accepted_by: string;
}

@Component({
  selector: 'page-helpaccepted',
  templateUrl: 'helpaccepted.html',
})
export class HelpacceptedPage {

  private itemDoc: AngularFirestoreDocument<Item>;
  feeds: Observable<any[]>;
 
  constructor(private afs: AngularFirestore, private auth: AuthService) {
  }
  
  id: string;

  ionViewDidLoad()
  {
    this.feeds = this.afs.collection('feeds').valueChanges();
    this.id = this.auth.getUid();
  }

 remove(item)
  {
    this.itemDoc = this.afs.doc<Item>('feeds/'+item.id);
    item.accepted_by=null;
    this.itemDoc.update(item);
  }

}
