import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule} from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LayoutComponent } from './layout/layout.component';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    CustomMaterialModule,
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
