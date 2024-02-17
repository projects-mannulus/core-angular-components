import {
  StepperOrientation,
  StepperSelectionEvent,
} from "@angular/cdk/stepper";
import {
  AfterViewChecked,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from "@angular/core";
import { MatStepper, MatStepperIntl } from "@angular/material/stepper";
import { map, Observable } from "rxjs";
import { StepperContentDirective } from "./directives/stepper-content/stepper-content.directive";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";

/**
 * stepper generico con scss y funcionalidades como el titulo, subtitulo, boton de regresar.
 *
 * se utiliza la directiva @see mainStepperContentComponent para definir cada uno de los hijos de los step.
 */
@Component({
  selector: "app-mat-stepper-main",
  templateUrl: "./mat-stepper-main.component.html",
  styleUrls: ["./mat-stepper-main.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class MatStepperMainComponent implements AfterViewChecked {
  /**
   * subtitulo en la parte superior de los stepper, puede ser uno para cada step o uno para todos.
   */
  @Input() subtitle: string | string[] = null;

  /**
   * retorna el componente del mat-stepper
   */
  @ViewChild("stepper")
  set SetStepper(value: MatStepper) {
    this.myStepper = value;
    this.stepper.emit(value);
  }

  /**
   * componente mat-stepper
   */
  myStepper: MatStepper;

  /**
   * obtiene el indice actual del stepper
   */
  @Input() selectedIndex: number = 0;

  @Output() selectedIndexChange: EventEmitter<number> = new EventEmitter();

  /**
   * retorna el componente <mat-stepper>
   */
  @Output() stepper: EventEmitter<MatStepper> = new EventEmitter();

  /**
   * evento del mat-stepper al cambiar de step.
   */
  @Output()
  selectionChange: EventEmitter<StepperSelectionEvent> = new EventEmitter();

  @ContentChildren(StepperContentDirective)
  contentSteppers: QueryList<StepperContentDirective>;

  /**
   * orientacion utilizada para bajar el stepper en pantallas pequeñas o moviles.
   */
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private stepperService: MatStepperIntl
  ) {
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 960px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
    stepperService.optionalLabel = "Opcional";
  }

  ngAfterViewChecked() {
    this.stepsIcons();
  }

  /**
   * asigna el icono de cada step.
   */
  stepsIcons() {
    //se aplican los iconos de cada step
    for (let index = 0; index < this.contentSteppers.length; index++) {
      const item = this.contentSteppers.get(index);
      if (item.icon) {
        document
          .querySelector(
            `.mat-step-header[aria-posinset="${index + 1}"] .mat-step-icon`
          )
          .setAttribute("data-icon-step", item.icon);
      }
    }
  }

  /**
   * obtiene el subtitulo de los stepper.
   *
   * puede ser uno solo para todos o uno para cada step.
   * @returns el subtitulo del step actual.
   */
  getSubtitle(): string {
    if (Array.isArray(this.subtitle)) {
      return this.subtitle.length > 1
        ? this.subtitle[this.selectedIndex]
        : this.subtitle[0];
    } else {
      return this.subtitle;
    }
  }
}
