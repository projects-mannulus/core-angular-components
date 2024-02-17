import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgTableConfig } from './models/table.config.model';
import { MatTableDataSource } from '@angular/material/table';
import { MappingPipe } from '../../pipes/mapping.pipe';
import { cascadeKey } from '@core/utils/utils';
import { SearchFilterPipe } from '@shared/pipes/search-filter.pipe';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { checkEventTable } from './models/checkEvent.interface';

@Component({
  selector: 'app-ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
})
export class NgTableComponent<T> implements OnInit {
  /**
   * Configuración de la tabla.
   */
  @Input()
  set config(configuration: NgTableConfig<T>) {
    this._config = configuration;
  }

  get config(): NgTableConfig<T> {
    return this._config;
  }

  _config!: NgTableConfig<T>;

  /**
   * filas de la tabla que estan seleccionados por el checkbox.
   */
  @Input()
  set checked(checked: T[]) {
    this.checkedRows = checked;
  }

  @Input()
  filterCheck: (row: T, item: T) => T;

  checkedRows: T[] = [];

  @Output() editAction: EventEmitter<T> = new EventEmitter();

  @Output() deleteAction: EventEmitter<T> = new EventEmitter();

  @Output() viewAction: EventEmitter<T> = new EventEmitter();

  @Output() addAction: EventEmitter<T> = new EventEmitter();

  @Output() checkedChange: EventEmitter<checkEventTable<T>> =
    new EventEmitter();

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  /**
   * variable que guarda la suscripcion de los datos de la tabla cuando se busca la informacion por peticiones http.
   */
  susbcribeHttpData: Subscription;

  /**
   * variable que guarda el la pagina actual. (si es paginable)
   */
  get page(): number {
    return this.paginator?.pageIndex || 0;
  }

  get pageSize(): number {
    return this.paginator?.pageSize || 5;
  }

  get pageSizeOptions(): number[] {
    return this.config.pageableOptions?.pageSizeOptions || [5, 10, 25, 100];
  }

  /**
   * variable que guarda el total de elementos de la tabla. (si es paginable)
   */
  lengthData: number = 0;

  controlFilter: FormControl = new FormControl('');
  typingTimer: any;
  /**
   * tiempo de espera antes de buscar los datos segun el filtro. (solo aplica si es urlData)
   */
  timeToSearch: number = 500;

  @ViewChild('paginator', { static: false })
  set matPaginator(mp: MatPaginator) {
    this._paginator = mp;

    if (this.subcriptionPaginator) {
      this.subcriptionPaginator.unsubscribe();
    }
    this.subcriptionPaginator = this.paginator?.page.subscribe(() => {
      this.findData();
    });
  }

  get paginator(): MatPaginator {
    return this._paginator;
  }

  _paginator: MatPaginator;

  subcriptionPaginator: Subscription;

  get hideColumnActions() {
    return (
      this.config?.hideDefaultActions?.edit &&
      this.config?.hideDefaultActions?.delete &&
      this.config?.hideDefaultActions?.view &&
      !this.config?.checkbox &&
      (this.config?.actions ? this._config.actions?.length === 0 : true)
    );
  }

  constructor(
    private httpClient: HttpClient,
    private mappingPipe: MappingPipe,
    private filterPipe: SearchFilterPipe
  ) {}

  ngOnInit() {
    this.findData();
    this.controlFilter.valueChanges.subscribe((value) => {
      if (this.config.pageable) {
        clearTimeout(this.typingTimer); // Limpiar el temporizador previo
        this.typingTimer = setTimeout(() => {
          this.findData();
        }, this.timeToSearch);
      } else {
        this.dataSource.data = this.filterPipe.transform(
          this.config.allData,
          value,
          this.config.keys
        );
      }
    });
  }

  /**
   * metodo que busca los datos de la tabla.
   */
  findData() {
    if (this.config.urlData) {
      const params = {};
      if (this.config.pageable) {
        params[this.config.pageableOptions?.pageKey || 'page'] = this.page;
        params[this.config.pageableOptions?.sizeKey || 'size'] = this.pageSize;
        params['query'] = this.controlFilter.value;
        // params.[
        //   this.config.pageableOptions?.sortKey || 'sort'] =
        //   'id,desc'
        // ;
        if (this.config.pageableOptions?.otherParams) {
          Object.keys(this.config.pageableOptions?.otherParams).forEach(
            (key) => {
              params[key] = this.config.pageableOptions?.otherParams[key];
            }
          );
        }
        console.log(params);
      }
      this.susbcribeHttpData?.unsubscribe();
      this.susbcribeHttpData = this.httpClient
        .get(this.config.urlData, { params: params })
        .subscribe((data: any) => {
          if (!data) {
            this.dataSource.data = [];
            return;
          }
          if (this.config.dataOptions?.dataKey) {
            this.dataSource = data[this.config.dataOptions?.dataKey];
          } else if (this.config.pageable) {
            this.dataSource.data = data.content;
            //se asigna el paginador
            this.lengthData = data.totalElements;
          } else {
            this.dataSource.data = data;
            this.lengthData = data.length;
          }
        });
    } else {
      this.dataSource.data = this.config.allData;
    }
  }

  /**
   * metodo que mapea los datos de la tabla.
   * @param row
   * @param key
   */
  toMapper(row: any, key: string, indexKey: number) {
    let value = '';
    if (key.split('.').length > 0) {
      value = cascadeKey(row, key);
    } else {
      value = row[key];
    }
    //si tiene el columntypes
    if (this.config.typeColumns && this.config.typeColumns[indexKey]) {
      return this.mappingPipe.transform(
        value,
        this.config.typeColumns[indexKey]
      );
    }

    if (this.config.mapperColums && this.config.mapperColums[indexKey]) {
      return this.config.mapperColums[indexKey](value, row);
    } else {
      return value;
    }
  }

  /**
   * Metodo que agrega o elimina un elemento a la lista de elementos seleccionados.
   * @param row
   */
  checkRow(row: T) {
    let on = true;
    if (this.isChecked(row)) {
      on = false;
      this.checkedRows = this.checkedRows.filter((item) => item !== row);
    } else {
      on = true;
      this.checkedRows.push(row);
    }
    this.checkedChange.emit({
      row: row,
      type: on ? 'on' : 'off',
      allChecked: this.checkedRows,
    });
  }

  isChecked(row: T): boolean {
    return this.checkedRows.find((item) => {
      if (this.filterCheck) {
        return this.filterCheck(row, item);
      }
      return item === row;
    }) != null;
  }
  // ========================= DEFAULT ACTIONS =========================

  edit(row: any) {
    this.editAction.emit(row);
  }

  deleteItem(row: any) {
    this.deleteAction.emit(row);
  }

  view(row: any) {
    this.viewAction.emit(row);
  }
}
