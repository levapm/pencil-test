import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardCanvasComponent } from './dashboard-canvas/dashboard-canvas.component';

@NgModule({
  declarations: [DashboardCanvasComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class DashboardModule { }
