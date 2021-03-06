import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

export interface Item {
  id:string;
  accepted_by: string;
}


@Component({
  selector: 'app-root',
  templateUrl: 'home.html',
})
export class HomePage {
 
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

  accept(item: Item)
  {
    this.itemDoc = this.afs.doc<Item>('feeds/'+item.id);
    item.accepted_by=this.id;
    this.itemDoc.update(item);
  }

}