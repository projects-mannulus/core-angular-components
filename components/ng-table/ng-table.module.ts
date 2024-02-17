import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTableComponent } from './ng-table.component';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    FeatherIconsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [NgTableComponent],
  exports: [NgTableComponent]
})
export class NgTableModule { }
