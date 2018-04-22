import { Component } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the HelprequestedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Item {
  id:string;
}

@Component({
  selector: 'page-helprequested',
  templateUrl: 'helprequested.html',
})
export class HelprequestedPage {
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

  delete(item)
  {
    this.itemDoc = this.afs.doc<Item>('feeds/'+item.id);
    this.itemDoc.delete();
  }


}
