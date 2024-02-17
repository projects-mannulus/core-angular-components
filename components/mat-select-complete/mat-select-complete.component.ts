import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldAppearance,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { BehaviorSubject, Observable, Subscription, of, tap } from 'rxjs';
//import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-mat-select-complete',
  templateUrl: './mat-select-complete.component.html',
  styleUrls: ['./mat-select-complete.component.scss'],
  //providers: [SearchFilterPipe],
})
export class MatSelectCompleteComponent implements OnInit, OnDestroy {
  /**
   * key de donde se obtiene el valor a mostrar en el select.
   */
  @Input()
  key: string = null;

  /**
   * value que se le asignara al formControl.
   */
  @Input()
  keyValue: string = null;

  /**
   * nombre del input
   */
  @Input()
  label: string;

  /**
   * placeholder del input.
   */
  @Input()
  placeholder: string;

  @Input()
  appearance: MatFormFieldAppearance = null;

  /**
   * formcontrol donde se guarda el valor seleccionado.
   * dependiento de keyValue.
   */
  @Input()
  control: AbstractControl;

  @Input()
  required: boolean = false;

  /**
   * indica si al buscar en el input se debe recargar la lista.
   */
  //@Input()

  //reloadOnTyping: boolean = false;

  /**
   * indica si el input esta deshabilitado.
   */
  @Input()
  set disabled(value: boolean) {
    if (value) {
      this.controlText.disable();
    } else {
      this.controlText.enable();
    }
  }

  /**
   * asigna el valor seleccionado. (se debe pasar el objeto completo).
   * se toma el objeto y segun a la key se obtiene el valor a mostrar en el input y el valor del control.
   */
  @Input()
  set value(value: any) {
    if (value && value[this.key]) {
      //this.datos.push(value);
      //this.selectedOption = value;
      this.controlText.setValue(this.key ? value[this.key] : value);
      this.control.setValue(this.keyValue ? value[this.keyValue] : value);
    }
  }

  /**
   * indica si se debe mostrar el boton de limpiar.
   */
  @Input()
  clearButton: boolean = false;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  /**
   * emite el valor del input.
   */
  @Output() busquedaChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * control para el text del input.
   */
  controlText: FormControl = new FormControl('');

  /**
   * valor seleccionado.
   */
  //selectedOption: any = null;

  /**
   * indica cuando se suscribio al observable para obtener la lista filtrada de opciones (util caundo es una peticion un recurso en internet).
   */
  searching: boolean = false;

  constructor(
    //private pipeFilter: SearchFilterPipe,
    private http: HttpClient,
    @Optional()
    @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS)
    public optionsFormField: MatFormFieldDefaultOptions,
    private cdr: ChangeDetectorRef
  ) {
    if (optionsFormField) {
      this.appearance = optionsFormField.appearance;
    }
  }

  /**
   * subscripcion a la lista de opciones filtradas.
   */
  subscritionList: Subscription;

  /**
   * temporizador para saber cuando el usuario termino de escribir y buscar la informacion.
   */
  typingTimer: any;

  /**
   * lista de opciones a mostrar en el select.
   */
  @Input()
  options: any[] | ((text: any) => Observable<any[]>);

  @Input()
  doneTypingInterval: number = 350; // Tiempo en milisegundos para considerar que el usuario ha terminado de escribir

  changeFilterOptionsSubject = new BehaviorSubject<any[]>([]);
  filteredOptions: Observable<any[]>;

  ngOnInit() {
    this.filteredOptions = this.changeFilterOptionsSubject.asObservable();
    this.controlText.valueChanges.subscribe((value) => {
      this.loadOptions(value);
    });
    this.controlText.setValue(this.value);
    if (!this.control) {
      console.log('no se asigno control');
      this.control = new FormControl('');
    }
  }

  /**
   * carga la lista de opciones.
   */
  loadOptions(value: string) {
    this.busquedaChange.emit(value); //informa el valor del input cambio
    if (this.subscritionList) {
      this.subscritionList.unsubscribe();
    }
    clearTimeout(this.typingTimer); // Limpiar el temporizador previo
    this.typingTimer = setTimeout(() => {
      this.searching = true;
      this.subscritionList = this._filter(value || '')
        .pipe(
          tap((data) => {
            this.searching = false;
          })
        )
        .subscribe((data) => {
          this.changeFilterOptionsSubject.next(data);
        });
    }, this.doneTypingInterval);
  }

  private _filter(value: string): Observable<any[]> {
    const filterValue = value.toLowerCase();

    if (!(this.options instanceof Function)) {
      return of(
        this.options.filter((option) => {
          return typeof option === 'string'
            ? option.toLowerCase().includes(filterValue)
            : option[this.key].toLowerCase().includes(filterValue);
        })
      );
    } else {
      return this.options(value);
    }
  }

  /**
   * se ejecuta cada vez que se escribe en el input.
   */
  handleInput() {
    // let dato = this.datos.find((x) => x[this.key] == this.controlText.value);
    // if (dato) {
    //   this.selectedOption = dato;
    //   this.selectedChange.emit(dato);
    // } else {
    //   //this.selectedOption = null;
    // }
    //if (this.reloadOnTyping) {
    // clearTimeout(this.typingTimer); // Limpiar el temporizador previo
    // this.typingTimer = setTimeout(
    //   () => this.updateDataList(),
    //   this.doneTypingInterval
    // );
    //}
  }

  // handleBlur() {
  //   if (this.required) {
  //     setTimeout(() => {
  //       if (this.selectedOption) {
  //         this.controlText.setErrors(null);
  //       } else {
  //         this.controlText.setErrors({ required: true });
  //       }
  //     }, 100);
  //   }
  //   if (
  //     this.selectedOption &&
  //     this.controlText.value !== this.selectedOption[this.key]
  //   ) {
  //     this.controlText.setValue(this.selectedOption[this.key]);
  //   }
  // }

  // handleFocus() {
  //   this.focus.emit();
  // }

  /**
   * actualiza la lista de datos.
   * en caso de que sea un observable se suscribe a el.
   */
  //updateDataList(newValueText?: any) {
  // this.subscritionList?.unsubscribe();
  // if (this.list$ instanceof Observable) {
  //   this.searching = true;
  //   this.subscritionList = this.list$.subscribe(
  //     (data) => {
  //       this.datos = data;
  //       this.subscritionList?.unsubscribe();
  //       this.searching = false;

  //       let current = this.datos.find(
  //         (x) => x[this.keyValue] == newValueText
  //       );
  //       if (current) {
  //         this.controlText.setValue(current[this.key], { emitEvent: false });
  //         this.selectedOption = current;
  //         this.selectedChange?.emit(current);
  //       }
  //     },
  //     (error) => {
  //       this.searching = false;
  //     }
  //   );
  // } else {
  //   this.datos = this.list$;
  // }
  //}

  selecItem(option: any) {
    console.log(option, this.keyValue);
    //this.selectedOption = option;
    this.control.setValue(this.keyValue ? option[this.keyValue] : option);
    // //se selecciono un item segun al input
    // if (option[this.key] != this.controlText.value) {
    //   this.controlText.setValue(option[this.key]);
    //   this.controlText.setErrors(null);
    // }
    // if (this.keyValue) {
    //   this.control.setValue(option[this.keyValue]);
    // }
    // this.selectedChange?.emit(option);
  }

  /**
   * lista filtrada por el input.
   */
  filterList(value: string) {
    //return this.datos;
    //return this.pipeFilter.transform(this.datos, value, this.key);
  }

  limpiar(event: Event) {
    event?.stopImmediatePropagation();
    this.controlText.setValue(null);
    this.control.setValue(null);
    this.selectedChange?.emit(null);
  }

  ngOnDestroy(): void {
    this.subscritionList?.unsubscribe();
  }
}
