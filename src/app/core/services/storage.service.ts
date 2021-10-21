import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  public upload(filename: string, data: any) {
    return this.storage.upload(filename, data);
  }

  public getRef(filename: string) {
    return this.storage.ref(filename);
  }
}
