import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {
  selectBeansQuantity,
  selectIsDispensingBeans,
  selectPourCoffeeState
} from "../../State/BeansContainer/beans-container.selectors";

@Component({
  selector: 'app-beans-container',
  templateUrl: './beans-container.component.html',
  styleUrl: './beans-container.component.css'
})
export class BeansContainerComponent {
  beansQuantity = this.store.select(selectBeansQuantity);
  isDispensing = this.store.select(selectIsDispensingBeans);
  isPouring = this.store.select(selectPourCoffeeState);
  constructor(
    private store: Store<AppState>
  ) {
  }

}
