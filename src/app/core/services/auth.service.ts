import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/delay';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationService } from './notification.service';


export interface User {
    uid?: string;
    provider?: string;
    name?: string;
    email?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    currentUser: BehaviorSubject<User> = new BehaviorSubject({});
    constructor(private afAuth: AngularFireAuth,
        private notify: NotificationService,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {

        firebase.auth().onAuthStateChanged((user) => {
            let newUser = {};
            if (user) {
                newUser = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    provider: 'Gmail'
                };
                this.localStorage.setItem('currentUser', user.uid);
                this.localStorage.setItem('currentUserEmail', user.email);
                this.localStorage.setItem('currentUserName', user.displayName);
            } else {
                this.localStorage.removeItem('currentUser');
                this.localStorage.removeItem('currentUserEmail');
                this.localStorage.removeItem('currentUserName');
            }
            this.setCurrentUser(newUser);
        });
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider).catch(error => {
            this.notify.openSnackBar(error);
        });
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider);
    }

    getCurrentUser(): Observable<User> {
        return this.currentUser.asObservable();
    }

    private setCurrentUser(user: User): void {
        this.currentUser.next(user);
    }

}
