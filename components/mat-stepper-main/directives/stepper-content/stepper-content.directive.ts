import { Directive, Input, TemplateRef } from "@angular/core";

/**
 * Directiva para el contenido que se mostara dentro de cada step del stepper,
 * del componente @see MatStepperMainComponent
 *
 * @example
 * <ng-template
 *   stepperContent
 *   [label]="'MODULES.PORTFOLIO.FORM_CONV' | translate"
 *   icon="move_up"
 *   [edtiable]="true"
 *   [disabled]="false"
 * >
 *   aqui va el contenido del stepper
 * </ng-template>
 *
 */
@Directive({ selector: "[stepperContent]" })
export class StepperContentDirective {
  /**
   * label del step
   */
  @Input() label: string;

  /**
   * icono del step.
   * @Note Esto modifica el DOM desde el TS,
   * luego de ser generado por mat-stepper (utilizar con cuidado).
   */
  @Input()
  icon: string;

  /**
   * attributo [editable] dentro del mat-step.
   *
   * Si el usuario puede volver a este paso una vez que se haya marcado como completó.
   */
  @Input() editable: boolean = true;

  /**
   * indica si el step esta desactivado
   */
  @Input() disabled: boolean = false;

  /**
   * indica si el step es opcional.
   */
  @Input() optional: boolean = false;

  @Input() state: string = null;

  constructor(public template: TemplateRef<any>) {}
}
