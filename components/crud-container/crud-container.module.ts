import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudContainerComponent } from './crud-container.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatIconModule } from '@angular/material/icon';
import { NgTableModule } from '../ng-table/ng-table.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalViewModule } from '../modal-view/modal-view.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [CrudContainerComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MatIconModule,
    NgTableModule,
    MatButtonModule,
    MatDialogModule,
    ModalViewModule,
    PipesModule,
  ],
  exports: [CrudContainerComponent],
})
export class CrudContainerModule {}
