import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaterSettings} from "../../Settings/HeaterSettings";
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectHeaterHot, selectHeaterOn} from "../../State/Heater/heater.selectors";
import {Subscription, combineLatest} from "rxjs";

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrl: './heater.component.css'
})
export class HeaterComponent implements OnInit, OnDestroy {
  readonly heaterSettings = HeaterSettings;

  onState = this.store.select(selectHeaterOn);
  hotState = this.store.select(selectHeaterHot);
  transitionTime = 1;
  subs: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.subs.add(
      this.store.select(selectHeaterOn).subscribe(heaterOn => {
        this.transitionTime = (heaterOn ? this.heaterSettings.heatingTime + 1 : this.heaterSettings.coolingTime + 3) / 1000
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
