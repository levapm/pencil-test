import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Draw {
  docId: string;
  userId: string;
  displayName: String;
  canvas: any;
  shared: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collection: string;
  constructor(
    private firestore: AngularFirestore,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) {
    this.collection = 'draw';
  }

  public create(canvas) {
    return this.firestore.collection(this.collection).add({
      canvas: canvas,
      userId: this.localStorage.getItem('currentUser'),
      displayName: this.localStorage.getItem('currentUserName'),
      shared: []
    });
  }

  public getById(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).valueChanges();
  }

  public get() {
    return this.firestore.collection(this.collection, ref => ref.where('userId', '==', this.localStorage.getItem('currentUser')))
    .valueChanges({ idField: 'docId'});
  }

  public sharedWithMe() {
    return this.firestore.collection(this.collection, ref => ref.where('shared', 'array-contains', this.localStorage.getItem('currentUserEmail')))
    .valueChanges({ idField: 'docId'});
  }

  public update(id: string, data: Draw) {
    return this.firestore.collection(this.collection).doc(id).set(data);
  }
}
