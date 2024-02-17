import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperMainComponent } from "./mat-stepper-main.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";
import { StepperContentDirective } from "./directives/stepper-content/stepper-content.directive";

@NgModule({
  declarations: [MatStepperMainComponent, StepperContentDirective],
  exports: [MatStepperMainComponent, StepperContentDirective],
  imports: [CommonModule, MatStepperModule, MatCardModule],
})
export class MatStepperMainModule {}
