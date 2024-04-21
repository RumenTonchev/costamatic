import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BeverageInterface} from "../../../Interfaces/beverage-interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../State/app.state";
import {makeBeverage} from "../../../State/Machine/machine.actions";
import {selectMachineState} from "../../../State/Machine/machine.selectors";
import {combineLatest, Subscription} from "rxjs";
import {selectBeansQuantity} from "../../../State/BeansContainer/beans-container.selectors";
import {selectMilkContainerQuantity} from "../../../State/MilkContainer/milk-container.selectors";

@Component({
  selector: 'app-beverage-button',
  templateUrl: './beverage-button.component.html',
  styleUrl: './beverage-button.component.css'
})
export class BeverageButtonComponent implements OnInit, OnDestroy {
  @Input() beverage: BeverageInterface;

  subs: Subscription = new Subscription();
  isDisabled: boolean = false;
  isActive: boolean = false;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.subs.add(
      combineLatest(
        ([
          this.store.select(selectBeansQuantity),
          this.store.select(selectMilkContainerQuantity),
          this.store.select(selectMachineState)
        ])
      ).subscribe(([
                     coffee, milk, machineState
                   ]) => {
        const quantities: { [key: string]: number } = {
          coffee: coffee,
          milk: milk
        }
        if (machineState === 'on') {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
          this.isActive = false;
          Object.keys(this.beverage.ingredients).forEach(key => {
            this.isDisabled = this.isDisabled || quantities[key] < this.beverage.ingredients[key];
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  createBeverageEvent() {
    this.isActive = true;
    this.store.dispatch(makeBeverage({content: this.beverage}));
  }
}
