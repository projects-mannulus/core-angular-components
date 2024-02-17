import { Direction } from '@angular/cdk/bidi';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgTableConfig } from '../ng-table/models/table.config.model';
import { ActionCrud, ModalConfig } from './models/action.crud';
import { DialogService } from '@core/dialog/services/dialog.service';
import { DialogIcon } from '@core/dialog/models/icon.dialog';
import { ModalResponse } from '@core/dialog/models/respuesta';
import { CrudContainerService } from './services/crudContainer.service';
import { NgTableComponent } from '../ng-table/ng-table.component';
import { EventsCrudContainer } from './models/events.crud';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { Router } from '@angular/router';
import { PasoParametrosService } from 'app/admin/paso-parametro.service';
import { FilterTableCRUD } from './models/filter.crud';
import { Marco } from '@core/dialog/models/marco';

@Component({
  selector: 'app-crud-container',
  templateUrl: './crud-container.component.html',
  styleUrls: ['./crud-container.component.scss'],
})
export class CrudContainerComponent implements OnInit {
  /**
   * titulo del contenido.
   */
  @Input() title: string;

  /**
   * subtitulo del contenedor.
   */
  @Input() subtitle: string;

  /**
   * icono del dialogo.
   */
  @Input() dialogIcon: DialogIcon;

  /**
   * muestra el boton de crear. al lado de los criterios de consulta.
   */
  @Input() showCreateButton = true;

  /**
   * filtros de busqueda para una tabla paginada.
   */
  @Input() filterTable: FilterTableCRUD[];

  @Input() configTable: NgTableConfig<any>;

  @Input() modalForm: ModalConfig<any>;

  @Input() events: EventsCrudContainer;

  /**
   * oculta el contenedor y muestra unicamente la tabla.
   */
  @Input() hideContainer = false;

  @Input() disableContainer = false;

  @ViewChild('table') table: NgTableComponent<any>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private crudService: CrudContainerService,
    private pasoParametrosService: PasoParametrosService
  ) {}

  ngOnInit() {
    console.log('INIT CRUD CONTAINER');
  }

  addNew() {
    if (this.modalForm.create.action) {
      this.modalForm.create.action(null);
    }
    if (this.modalForm.create.urlView) {
      this.pasoParametrosService.adicionarParametro('data', {});
      this.pasoParametrosService.adicionarParametro('modoEditar', false);
      this.router.navigate([this.modalForm.create.urlView]);
    } else {
      this.showModal(this.modalForm.create, null);
    }
  }

  edit(row: any) {
    if (this.modalForm.edit.action) {
      this.modalForm.edit.action(row);
    }
    if (this.modalForm.edit.urlView) {
      this.pasoParametrosService.adicionarParametro('data', row);
      this.pasoParametrosService.adicionarParametro('modoEditar', true);
      this.router.navigate([this.modalForm.edit.urlView]);
    } else {
      this.showModal(this.modalForm.edit, row);
    }
  }

  view(row: any) {
    if (this.modalForm.view.action) {
      this.modalForm.view.action(row);
    }
    if (this.modalForm.view.urlView) {
      this.pasoParametrosService.adicionarParametro('data', row);
      this.router.navigate([this.modalForm.view.urlView]);
    } else {
      this.dialogService
        .show({
          component: ModalViewComponent,
          ...this.modalForm.view.modal,
          dataComponent: {
            data: row,
            config: this.modalForm.view.configView,
          },
          hideDefaultActions: true,
        })
        .subscribe((data: ModalResponse) => {
          console.log(data);
        });
    }
  }

  deleteItem(row: any) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this.showModal(this.modalForm.delete, row);
  }

  showModal(action: ActionCrud<any>, row: any) {
    const dataModal: Marco = {
      ...action.modal,
      dataComponent: {
        action: action.actionType,
        row: row,
        data: row,
        config: action.configView,
      },
      icon: this.dialogIcon,
    };
    if (action.actionType === 'delete') {
      if (!action.modal?.component) {
        dataModal.component = ModalViewComponent;
      }
      if (!action.modal?.actions?.primary) {
        if (!dataModal.actions) {
          dataModal.actions = {};
        }
        dataModal.actions.primary = 'Eliminar';
      }
    }

    this.dialogService.show(dataModal).subscribe((accion: ModalResponse) => {
      if (accion.estado) {
        let observer;

        if (action.urlEndpoint) {
          switch (action.actionType) {
            case 'add':
              observer = this.crudService.postData(
                action.urlEndpoint,
                accion.data
              );
              break;
            case 'delete':
              observer = this.crudService.deleteData(
                action.urlEndpoint,
                row.id
              );
              break;
            case 'edit':
              observer = this.crudService.putData(
                action.urlEndpoint,
                accion.data
              );
              break;
          }
        } else {
          console.warn(
            'No se implemento el campo urlEndpoint por lo tanto se utilizara "actionModalAccept"'
          );
          observer = action.actionModalAccept(accion.data);
          console.log(observer);
          if (!observer) {
            this.table.findData();
            return;
          }
        }
        observer.subscribe((data) => {
          this.table.findData();
        });
      }
    });
  }
}
