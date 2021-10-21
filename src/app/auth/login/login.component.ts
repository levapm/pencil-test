import { NotificationService } from 'src/app/core/services/notification.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading: boolean;

    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    ngOnInit() {
        if (this.localStorage.getItem('currentUser')) {
            this.router.navigate(['/dashboard']);
        }
    }

    async loginGoogle() {
        this.loading = true;
        await this.authenticationService.googleLogin();
        this.loading = false;
        this.router.navigate(['/dashboard']);
    }

}
