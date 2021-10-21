import { FabricService } from './../../core/services/fabric.service';
import { FirebaseStorageService } from './../../core/services/storage.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../core/services/auth.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import 'fabric';
import { FirestoreService } from 'src/app/core/services/database.service';
declare const fabric: any;


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    userName: string;
    isDrawingMode: boolean;

    private autoLogoutSubscription: Subscription;
    private dbSubs: Subscription;
    image: any;
    file: File = null;
    color = '#000';
    width = 10;
    doc: any;
    isLoaded: boolean;
    loading: boolean;


    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private authService: AuthenticationService,
        private storageService: FirebaseStorageService,
        private databaseService: FirestoreService,
        private fabricService: FabricService,
        private authGuard: AuthGuard) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe(currentUser => {
            this.userName = currentUser.name;
        });
        // Auto log-out subscription
        const timer = TimerObservable.create(2000, 5000);
        this.autoLogoutSubscription = timer.subscribe(t => {
            this.authGuard.canActivate();
        });

        this.fabricService.canvas = new fabric.Canvas('fabricSurface');


        this.dbSubs = this.databaseService.get().subscribe(docs => {
            if (!docs.length) {
                this.databaseService.create(JSON.stringify(this.fabricService.canvas));
            } else {
                this.doc = docs.pop();
                if (!this.isLoaded) {
                    this.fabricService.load(JSON.parse(this.doc.canvas));
                    this.isLoaded = true;
                }
            }
        });

        this.fabricService.detectChanges().subscribe((canvas) => {
            if (this.doc && this.doc.docId) {
                this.doc.canvas = JSON.stringify(canvas);
                this.databaseService.update(this.doc.docId, this.doc);
            }
        });

    }

    async upload(event) {
        if (event.target.files.length) {
            this.loading = true;
            const file = event.target.files[0];
            const filename = event.target.files[0].name;
            const ref = this.storageService.getRef(filename);
            await this.storageService.upload(filename, file);
            ref.getDownloadURL().subscribe((URL) => {
                this.fabricService.addImage(URL).then(() => {
                    this.loading = false;
                });
            });
        }
    }

    setDrawingMode(value: boolean) {
        this.isDrawingMode = value;
        this.fabricService.isDrawingMode = value;
    }
    reset() {
        this.fabricService.clear();
    }

    async logout() {
        this.dbSubs.unsubscribe();
        await this.authService.logout();
        this.authGuard.canActivate();
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

}
