import {Component} from '@angular/core';
import {BeverageInterface} from "../../Interfaces/beverage-interface";
import {selectBeansQuantity} from "../../State/BeansContainer/beans-container.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectAllBeverages} from "../../State/Beverages/beverages.selectors";

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent {

  beansQuantity = this.store.select(selectBeansQuantity);
  beverages = this.store.select(selectAllBeverages);

  constructor(
    private store: Store<AppState>
  ) {
  }
}
