import { UntypedFormGroup } from "@angular/forms";

/**
 * interfaz de los componentes que se incluyen dentro del dialogo.
 */
export interface IDialogActions {
  form: UntypedFormGroup;
  onSubmit?(): void;
  /**
   * metodo utilizado para llamar al click del segundo boton.
   * se debe implementar en el componente que se desee utilizar.
   */
  onCancel(): void;
}
