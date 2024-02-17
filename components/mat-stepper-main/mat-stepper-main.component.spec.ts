import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MatStepperMainComponent } from "./mat-stepper-main.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";

describe("MatStepperMainComponent", () => {
  let component: MatStepperMainComponent;
  let fixture: ComponentFixture<MatStepperMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatStepperMainComponent],
      imports: [RouterTestingModule, MatStepperModule, MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatStepperMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
