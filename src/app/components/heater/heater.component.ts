import {Component} from '@angular/core';
import {HeaterSettings} from "../../Settings/HeaterSettings";
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectHeaterHot, selectHeaterOn} from "../../State/Heater/heater.selectors";

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrl: './heater.component.css'
})
export class HeaterComponent {
  readonly heaterSettings = HeaterSettings;

  onState = this.store.select(selectHeaterOn);
  hotState = this.store.select(selectHeaterHot);

  constructor(
    private store: Store<AppState>
  ) {
  }

}
