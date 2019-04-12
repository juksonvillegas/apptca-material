import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

import {
    MatButtonModule,
    MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTabsModule,
],
  exports: [MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTabsModule,
],
})
export class MaterialModule { }
