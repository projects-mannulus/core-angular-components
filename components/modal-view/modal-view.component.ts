import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dataModalView } from './models/config.view.modal.view';
import { PipesModule } from '@shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { MappingPipe } from '@shared/pipes/mapping.pipe';
import { cascadeKey } from '@core/utils/utils';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss'],
})
export class ModalViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: dataModalView) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  getValueFromKey(key: string) {
    return cascadeKey(this.data.data, key);
  }
}
