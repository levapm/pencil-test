import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Draw {
  docId: string;
  userId: string;
  canvas: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collection: string;
  constructor(
    private firestore: AngularFirestore,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) {
    this.collection = 'draw';
  }

  public create(canvas) {
    return this.firestore.collection(this.collection).add({canvas: canvas, userId: this.localStorage.getItem('currentUser')});
  }

  public getById(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).valueChanges();
  }

  public get() {
    return this.firestore.collection(this.collection, ref => ref.where('userId', '==', this.localStorage.getItem('currentUser')))
    .valueChanges({ idField: 'docId'});
  }

  public update(id: string, data: Draw) {
    return this.firestore.collection(this.collection).doc(id).set(data);
  }
}
