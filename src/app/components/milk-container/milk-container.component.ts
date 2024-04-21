import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectMilkContainerQuantity, selectPouringMilkState} from "../../State/MilkContainer/milk-container.selectors";

@Component({
  selector: 'app-milk-container',
  templateUrl: './milk-container.component.html',
  styleUrl: './milk-container.component.css'
})
export class MilkContainerComponent {
  isPouring = this.store.select(selectPouringMilkState);
  quantity = this.store.select(selectMilkContainerQuantity);

  constructor(
    private store: Store<AppState>
  ) {
  }
}
