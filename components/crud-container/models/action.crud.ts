import { ComponentType } from '@angular/cdk/portal';
import { Marco } from '@core/dialog/models/marco';
import {
  dataModalView,
  configModalView,
} from '@shared/components/modal-view/models/config.view.modal.view';
import { Observable } from 'rxjs';

export interface ActionCrud<T> {
  /**
   * componente que se mostrara en el modal y que recibira la informacion para saber si crea o edita.
   */
  //component?: ComponentType<any>;
  /**
   * componente que se mostrara en el modal y que recibira la informacion para saber si crea o edita.
   */
  modal?: Marco;
  /**
   * si se quiere mostrar otro componente en la vista y enviarla la informacion de si es crear o editar. utilizando routerLink.
   */
  urlView?: string;
  /**
   * titulo del modal.
   */
  //title: string;

  actionType: 'add' | 'edit' | 'delete' | 'view';

  /**
   * url del endpoint para hacer la peticion POST, PUT, DELETE.
   */
  urlEndpoint?: string;

  /**
   * la configuracion de la vista de ver y el orden de la informacion
   */
  configView?: configModalView[];

  /**
   * accion que se invoka si no se paso una urlView o una modal, para determinar el comportamiento de dicho boton.
   */
  action?: (row) => void;
  
  /**
   * Accion que se ejecuta luego de aceptar y cerrar el modal.
   * @param form formulario del modal
   * @returns 
   */
  actionModalAccept?: (form: T) => void | Observable<T>;
}

export interface ModalConfig<T> {
  edit: ActionCrud<T>;
  create: ActionCrud<T>;
  delete: ActionCrud<T>;
  view: ActionCrud<T>;
}
