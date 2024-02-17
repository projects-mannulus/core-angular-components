import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Point } from 'chart.js';
import { ModalRequest } from '../../models/marco';
import { Button } from '../../models/button';
import { ModalResponse } from '../../models/respuesta';
import { AdDirective } from '../../directives/ad.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, AfterViewInit {
  /**
   * Acción ejecutada por el usuario.
   */
  @Output() accion = new EventEmitter<ModalResponse>();

  /**
   * Directiva para injectar los componentes.
   */
  @ViewChild(AdDirective, { static: true })
  adHost!: AdDirective;

  /**
   * Referencia al encabezado del modal.
   */
  @ViewChild('header', { static: false }) header: ElementRef;

  /**
   * Formulario del componente.
   */
  public form!: UntypedFormGroup;

  /**
   * Referencia al componente interior.
   */
  componentRef!: ComponentRef<any>;

  /**
   * Otros botones que se mostrarán en el dialogo.
   */
  otherButtons: Button[] = [];

  /**
   * Posición del modal.
   */
  dragPosition: Point = null;

  /**
   * Constructor del componente.
   *
   * @param data - Data que se enviará al componente.
   * @param dialogRef - Referencia al dialogo.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalRequest,
    public dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef,
  ) {}

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    if (this.adHost) {
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(this.data.component);
      this.componentRef.instance.data = this.data.dataComponent;
      this.otherButtons = this.data.actions?.otherButtons
        ? this.data.actions.otherButtons
        : [];
    }
  }

  /**
   * AL comenzar a mover remuevo las animaciones del overlay pane.
   */
  removeTransition() {
    const element = document.querySelector('.modalax12789') as any;
    element.style.transition = 'none';
  }

  /**
   * AL comenzar a mover remuevo las animaciones del overlay pane.
   */
  addTransition() {
    const element = document.querySelector('.modalax12789') as any;
    element.style.transition = 'transform 300ms ease-out';
  }

  /**
   * Función que mueve el modal a cierta posición.
   *
   * @param dragPosition - Posición a donde se moverá.
   */
  moveToPosition(dragPosition: Point) {
    const element = document.querySelector('.modalax12789') as any;
    element.style.transform = `translate(${dragPosition.x}px, ${dragPosition.y}px)`;
    setTimeout(() => {
      element.style.transform = `translate(${0}px, ${0}px)`;
      this.dragPosition = dragPosition;
    }, 300);
  }

  /**
   * Funciómn que resetea la posición y ubica el modal en el centro.
   */
  resetPosition() {
    this.dragPosition = {
      x: 0,
      y: 0,
    };
  }

  /**
   * Cambia la referencia actual del formulario.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form = this.componentRef?.instance?.form;
    }, 0);
  }

  /**
   * Función al dar click en aceptar.
   * Envía el formulario por el subscribe.
   */
  aceptar() {
    if (!this.form?.invalid) {
      this.accion.emit({
        data: this.form?.getRawValue(),
        estado: true,
        dialogRef: null,
      });
    } else {
      this.form?.markAllAsTouched();
    }
  }

  /**
   * Cierra el dialogo.
   */
  async cerrar() {
    this.dialogRef.close();
    this.accion.emit({ data: null, estado: false, dialogRef: null });
  }

  /**
   * Función al dar click en la acción secundaria, generalmente es cerrar el modal o limpiar el formulario.
   */
  cancelar() {
    if(this.componentRef.instance.cancelar){
      console.info('Method cancelar() exits at:̣̣ ' + this.componentRef.componentType.name);
      this.componentRef.instance.cancelar();
    }else{
      this.cerrar();
    }
    // if (this.data.dataComponent?.editMode) {
    // } else {
    //   this.componentRef.instance.cancelar();
    //   if (this.componentRef.instance.limpiarFormulario) {
    //     this.componentRef.instance.limpiarFormulario();
    //   } else {
    //     console.error(
    //       'Method limpiarFormulario() not exits at:̣̣ ' +
    //         this.componentRef.componentType.name,
    //     );
    //   }
    // }
  }
}
