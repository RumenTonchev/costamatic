import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectAllBeverages} from "../../State/Beverages/beverages.selectors";
import {selectDisplayText, selectErrorMsg} from "../../State/Machine/machine.selectors";

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent {

  beverages = this.store.select(selectAllBeverages);
  displayText$ = this.store.select(selectDisplayText);
  errorMsg$ = this.store.select(selectErrorMsg);

  constructor(
    private store: Store<AppState>
  ) {
  }
}
