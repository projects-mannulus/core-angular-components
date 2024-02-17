import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalViewComponent } from './modal-view.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
  ],
  declarations: [ModalViewComponent],
  exports: [ModalViewComponent]
})
export class ModalViewModule { }
