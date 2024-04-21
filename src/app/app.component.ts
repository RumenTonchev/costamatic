import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCurrentBeverage, selectDisplayText, selectMachineState} from "./State/Machine/machine.selectors";
import {AppState} from "./State/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  displayText = this.store.select(selectDisplayText);
  machineState = this.store.select(selectMachineState);
  currentBeverage = this.store.select(selectCurrentBeverage);

  constructor(
    private store: Store<AppState>
  ) {
  }


}
