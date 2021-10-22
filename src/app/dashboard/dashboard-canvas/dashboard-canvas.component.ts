import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseStorageService } from 'src/app/core/services/storage.service';
import { FirestoreService } from 'src/app/core/services/database.service';
import { FabricService } from 'src/app/core/services/fabric.service';
import 'fabric';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
declare const fabric: any;

@Component({
  selector: 'app-dashboard-canvas',
  templateUrl: './dashboard-canvas.component.html',
  styleUrls: ['./dashboard-canvas.component.css']
})
export class DashboardCanvasComponent implements OnInit {
  private dbSubs: Subscription;
  private dbSubsShared: Subscription;
  image: any;
  file: File = null;
  color = '#000';
  width = 10;
  doc: any;
  isLoaded: boolean;
  loading: boolean;
  isDrawingMode: boolean;
  shared: Array<any>;
  myDraw: any;
  readOnly: boolean;
  viewShareInput: boolean;
  shareEmail: string;

  constructor(
        private authService: AuthenticationService,
        private storageService: FirebaseStorageService,
        private databaseService: FirestoreService,
        private fabricService: FabricService) {
  }

  ngOnInit() {

    this.fabricService.canvas = new fabric.Canvas('fabricSurface');
    this.fabricService.color = this.color;
    this.fabricService.lineWeight = this.width;

      this.dbSubs = this.databaseService.get().subscribe(docs => {
        if (!docs.length) {
            this.databaseService.create(JSON.stringify(this.fabricService.canvas));
        } else {
            this.doc = docs.pop();
            if (!this.isLoaded) {
                this.myDraw = this.doc.canvas;
                this.fabricService.load(JSON.parse(this.myDraw));
                this.isLoaded = true;
            }
        }
      });

      this.fabricService.detectChanges().subscribe((canvas) => {
        if (this.doc && this.doc.docId && !this.readOnly) {
            this.doc.canvas = JSON.stringify(canvas);
            this.databaseService.update(this.doc.docId, this.doc);
        }
      });

      this.authService.getCurrentUser().subscribe(user => {
        if (!user.uid && this.isLoaded) {
          this.dbSubs.unsubscribe();
          this.dbSubsShared.unsubscribe();
        }
      });

      this.dbSubsShared = this.databaseService.sharedWithMe().subscribe(docs => {
          this.shared = docs;
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

  async share(email: string) {
    if (email) {
      this.loading = true;
      this.doc.shared.push(email);
      await this.databaseService.update(this.doc.docId, this.doc);
      this.loading = false;
      this.viewShareInput = false;
      this.shareEmail = '';
    }
  }

  setDrawingMode(value: boolean) {
    this.isDrawingMode = value;
    this.fabricService.isDrawingMode = value;
  }

  viewDraw(canvas) {
    this.readOnly = true;
    this.fabricService.load(JSON.parse(canvas));
  }

  viewMyDraw() {
    this.readOnly = false;
    this.fabricService.load(JSON.parse(this.myDraw));
  }

  reset() {
    this.fabricService.clear();
  }
}
