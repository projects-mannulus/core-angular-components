import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectCompleteComponent } from './mat-select-complete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  declarations: [MatSelectCompleteComponent],
  exports: [MatSelectCompleteComponent]
})
export class NgSelectAutocompleteModule { }
