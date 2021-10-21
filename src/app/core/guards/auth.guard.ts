import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService, User } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        @Inject('LOCALSTORAGE') private localStorage: Storage) { }

    canActivate() {
        if (!this.localStorage.getItem('currentUser')) {
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}
