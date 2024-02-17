import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdDirective } from './directives/ad.directive';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DialogComponent, AdDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [DialogComponent],
  providers: [],
})
export class ModalDialogModule {}
