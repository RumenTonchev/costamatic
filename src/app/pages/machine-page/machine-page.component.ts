import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectPouringMilkState} from "../../State/MilkContainer/milk-container.selectors";
import {selectCurrentStep, selectMachineState} from "../../State/Machine/machine.selectors";
import {MilkContainerSettings} from "../../Settings/MilkContainerSettings";
import {
  selectPourCoffeeState
} from "../../State/BeansContainer/beans-container.selectors";
import {BeansContainerSettings} from "../../Settings/BeansContainerSettings";

@Component({
  selector: 'app-machine-page',
  templateUrl: './machine-page.component.html',
  styleUrl: './machine-page.component.css'
})
export class MachinePageComponent implements OnInit, OnDestroy {
  readonly milkContainerSettings = MilkContainerSettings;
  readonly beansContainerSettings = BeansContainerSettings;

  coffeeTime = 0;
  coffeeQuantity = 0;
  milkTime = 0;
  milkQuantity = 0;
  inUse: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) {
  }


  ngOnInit() {
    this.subs.add(
      combineLatest([
        this.store.select(selectCurrentStep),
        this.store.select(selectPouringMilkState),
        this.store.select(selectPourCoffeeState),
        this.store.select(selectMachineState)
      ]).subscribe(([
                      currentStep,
                      isPouringMilk,
                      isPouringCoffee,
                      machineState
                    ]) => {
        if (this.inUse) {
          if (isPouringMilk && currentStep) {
            this.milkQuantity = currentStep.amount;
            this.milkTime = (this.milkContainerSettings.pouringTime * currentStep.amount) / 1000;
          }
          if (isPouringCoffee && currentStep) {
            this.coffeeQuantity = currentStep.amount;
            this.coffeeTime = (this.beansContainerSettings.pouringTime * currentStep.amount) / 1000;
          }
        } else if (!this.inUse && machineState === 'on') {
          this.coffeeTime = 0;
          this.coffeeQuantity = 0;
          this.milkTime = 0;
          this.milkQuantity = 0;
        }
        this.inUse = machineState === 'on';
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  cupClick() {
    if (!this.inUse) {
      this.coffeeQuantity = 0;
      this.coffeeTime = 0;
      this.milkQuantity = 0;
      this.milkTime = 0;
    }
  }
}
