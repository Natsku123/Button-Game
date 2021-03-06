import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule
} from '@angular/material'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Import materials and export them to app.module.ts (cleaner way)

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
