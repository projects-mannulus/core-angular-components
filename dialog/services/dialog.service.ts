import { Inject, Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Observable } from 'rxjs';
import { ModalRequest } from '../models/marco';
import { ModalResponse } from '../models/respuesta';

/**
 * Servicio manejar formularios crud en forma de modales
 *
 * @export
 * @class CrudService
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * Referencias de dialogos abiertos
   */
  referencias: Map<
    MatDialogRef<DialogComponent>,
    MatDialogRef<DialogComponent>
  > = new Map();

  /**
   * Constructor del servicio.
   *
   * @param dialog - MatDialog service de material.
   * @param dialogRef - Referencia al dialogo.
   * @param snackbar - Servicio de snackbar.\
   * @param newTranslate - Pipe de traducciones.
   */
  constructor(
    private dialog: MatDialog,
    //@Inject(MatDialogRef) private dialogRef: MatDialogRef<DialogComponent>,
  ) {}
  private dialogRef: MatDialogRef<DialogComponent>;
  /**
   * Método para abrir un dialogo de crud
   * @param {ModalRequest} data - Datos de configuración del diálogo
   * @returns
   */
  public show(data: ModalRequest): Observable<ModalResponse> {
    return new Observable((observer: any) => {
      const ref = this.dialog.open(DialogComponent, {
        disableClose: true,
        panelClass: 'modalax12789',
        maxHeight: data.maxHeight || '90vh',
        minHeight: data.minHeight || '300px',
        maxWidth: data.maxWidth || '600px',
        minWidth: data.minWidth || '300px',
        width: data.width || '95%',
        autoFocus: false,
        data,
      });
      this.referencias.set(ref, ref);
      this.dialogRef = ref;
      this.dialogRef.componentInstance.accion.subscribe(
        (accion: ModalResponse) => {
          accion.dialogRef = ref;
          observer.next(accion);
        },
        (err: any) => {
          observer.error(err);
        },
      );
    });
  }

  /**
   * Método para cerrar un dialogo de crud
   * @param {MatDialogRef<DialogComponent>} dialogRef - Referencia del dialogo
   */
  public close(dialogRef?: MatDialogRef<DialogComponent>) {
    if (dialogRef) {
      this.referencias.get(dialogRef)?.close();
      this.referencias.delete(dialogRef);
    } else {
      this.dialogRef.close();
    }
  }
}
