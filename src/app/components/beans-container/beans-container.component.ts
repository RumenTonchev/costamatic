import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {
  selectBeansQuantity,
  selectIsDispensingBeans,
  selectPourCoffeeState
} from "../../State/BeansContainer/beans-container.selectors";
import {BeansContainerSettings} from "../../Settings/BeansContainerSettings";
import {combineLatest, Subscription} from "rxjs";
import {selectMilkContainerQuantity, selectPouringMilkState} from "../../State/MilkContainer/milk-container.selectors";
import {selectCurrentStep, selectMachineState} from "../../State/Machine/machine.selectors";

@Component({
  selector: 'app-beans-container',
  templateUrl: './beans-container.component.html',
  styleUrl: './beans-container.component.css'
})
export class BeansContainerComponent implements OnInit, OnDestroy {
  readonly containerSettings = BeansContainerSettings;

  dispenseTime = 0;
  dispenseQuantity = 0;
  subs: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.subs.add(
      combineLatest([
        this.store.select(selectIsDispensingBeans),
        this.store.select(selectCurrentStep),
        this.store.select(selectBeansQuantity),
      ]).subscribe(([
                      isDispensing,
                      currentStep,
                      quantity,
                    ]) => {
          if (isDispensing && currentStep) {
            this.dispenseQuantity = quantity - currentStep.amount;
            this.dispenseTime = (this.containerSettings.dispenseTime * currentStep.amount) / 1000;
          } else {
            this.dispenseQuantity = quantity;
            this.dispenseTime = this.containerSettings.dispenseTime / 1000;
          }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
