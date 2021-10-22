import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MAT_DATE_FORMATS, MatIconModule, MatToolbarModule, MatButtonModule,
  MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
  MatSnackBarModule, MatMenuModule, MatSidenavModule,
  MatProgressSpinnerModule, MatDatepickerModule, MatTableModule,
  MatAutocompleteModule, MatDialogModule, MatTabsModule, MatTooltipModule,
  MatSelectModule, MatPaginatorModule, MatChipsModule, MatButtonToggleModule,
  MatSlideToggleModule, MatBadgeModule, MatCheckboxModule, MatExpansionModule, MatSortModule, MatGridListModule

} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';



export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatMomentDateModule,
    MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatDatepickerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatTooltipModule, MatSelectModule, MatPaginatorModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, DragDropModule, MatSortModule, MatSliderModule, MatGridListModule
  ],
  exports: [
    CommonModule,
    MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
    MatSnackBarModule, MatMenuModule, MatProgressSpinnerModule, MatDatepickerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatTooltipModule, MatSelectModule, MatPaginatorModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, DragDropModule, MatSortModule, MatSliderModule, MatGridListModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    { provide: LOCALE_ID, useValue: 'en-us' }
  ],
  declarations: []
})
export class CustomMaterialModule {
  static forRoot() {
    return {
      ngModule: CustomMaterialModule,
      providers: [
      ]
    };
  }
}
