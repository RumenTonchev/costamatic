import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectMilkContainerQuantity, selectPouringMilkState} from "../../State/MilkContainer/milk-container.selectors";
import {MilkContainerSettings} from "../../Settings/MilkContainerSettings";
import {selectCurrentStep} from "../../State/Machine/machine.selectors";
import {combineLatest, Subscription} from "rxjs";

@Component({
  selector: 'app-milk-container',
  templateUrl: './milk-container.component.html',
  styleUrl: './milk-container.component.css'
})
export class MilkContainerComponent implements OnInit, OnDestroy {
  readonly milkContainerSettings = MilkContainerSettings;

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
        this.store.select(selectPouringMilkState),
        this.store.select(selectCurrentStep),
        this.store.select(selectMilkContainerQuantity)
      ]).subscribe(([
                      isPouring,
                      currentStep,
                      quantity
                    ]) => {
        if (isPouring && currentStep) {
          this.dispenseQuantity = quantity - currentStep.amount;
          this.dispenseTime = (this.milkContainerSettings.pouringTime * currentStep.amount) / 1000;
        } else {
          this.dispenseQuantity = quantity;
          this.dispenseTime = this.milkContainerSettings.pouringTime / 1000;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
