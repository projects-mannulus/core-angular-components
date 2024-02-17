import { ComponentType } from '@angular/cdk/portal';
import { Button } from './button';
import { DialogIcon } from './icon.dialog';
/**
 * Interface que define la configuración que se le puede pasar a un crud dialog
 */
export interface ModalRequest {
  /**
   * Titulo del dialog
   */
  title: string | any;
  /**
   * icono que se mostrará en el dialog. (puede ser de material angular o una imagen)
   */
  icon?: DialogIcon;
  /**
   * Componente que se mostrará en el dialog: Deberá ser importado en la sección EntryComponents del módulo
   */
  component?: ComponentType<any>;
  /**
   * Data que recibirá el componente que se mostrará en el dialog, deberá incluir en su constructor una inyección de MAT_DIALOG_DATA
   */
  dataComponent?: any;

  /**
   * Ancho máximo del dialog. Por defecto 600px.
   */
  maxWidth?: string;

  /**
   * Alto máximo que tendrá el dialog. Por defecto es 90vh.
   */
  maxHeight?: string;

  /**
   * Ancho del modal respecto a la ventana del navegador. Por defecto es 95%.
   */
  width?: string;

  /**
   * Ancho mínimo del dialog. Por defecto 300px.
   */
  minWidth?: string;

  /**
   * Alto mínimo que tendrá el dialog. Por defecto es 300px.
   */
  minHeight?: string;

  /**
   * Indica si el último campo dentro del formulario del modal NO tiene un campo de material con padding de errores. Default: false.
   */
  lastFieldIsNotMaterialComponentWithError?: boolean;

  /**
   * Acciones que recibirá el dialog
   */
  actions?: {
    /**
     * Nombre que tendrá la acción primaria
     */
    primary?: string;
    /**
     * Nombre que tendrá la acción secundaria
     */
    secondary?: string;
    /**
     * Otros botones que se mostrarán en el dialog
     */
    otherButtons?: Button[];
  };

  /**
   * Indica si el dialog tendrá un formulario o es una vista de ver. Default: true.
   */
  hideDefaultActions?: boolean;

  /**
   * Permite pasar estilos customizados a la barra superior del modal.
   */
  stylesTopBar?: { [key: string]: string | number };

  /**
   * Permite mostrar u ocultar el botón X de cerrar del modal. Default false.
   */
  hideCloseButtonInTopBar?: boolean;
}
