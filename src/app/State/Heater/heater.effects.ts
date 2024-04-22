import {Injectable} from "@angular/core";
import {HeaterSettings} from "../../Settings/HeaterSettings";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {heaterOff, heaterOn, isCold, isHot} from "./heater.actions";
import {delayWhen, interval, map, withLatestFrom} from "rxjs";
import {selectHeaterHot, selectOfAt} from "./heater.selectors";
import {nextStep, turnOff} from "../Machine/machine.actions";
import {selectMachineState} from "../Machine/machine.selectors";

@Injectable()
export class HeaterEffects {
  readonly heaterSettings = HeaterSettings;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }

  heaterOn$ = createEffect(() => this.actions$.pipe(
    ofType(heaterOn),
    withLatestFrom(this.store.select(selectHeaterHot)),
    delayWhen(([data, isHot]) => isHot ? interval(0) : interval(this.heaterSettings.heatingTime)),
    withLatestFrom(this.store.select(state => state.machine)),
    map(([data, storeData]) => {
      this.store.dispatch(isHot());
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})

  heaterOff$ = createEffect(() => this.actions$.pipe(
    ofType(heaterOff),
    delayWhen(() => {
      return interval(this.heaterSettings.coolingTime);
    }),
    withLatestFrom(this.store.select(selectOfAt), this.store.select(selectMachineState)),
    map(([data, offAt, machineState]) => {
      const now = new Date();
      const diff = now.getTime() - offAt.getTime();
      if (machineState !== 'on' && diff >= this.heaterSettings.coolingTime) {
        this.store.dispatch(isCold());
      }
    }),
  ), {dispatch: false})

  isCold$ = createEffect(() => this.actions$.pipe(
    ofType(isCold),
    withLatestFrom(this.store.select(selectOfAt), this.store.select(selectMachineState)),
    map(([data, offAt, machineState]) => {
      const now = new Date();
      const diff = now.getTime() - offAt.getTime();
      if (machineState !== 'on' && diff >= this.heaterSettings.coolingTime) {
        this.store.dispatch(turnOff());
      }
    })
  ), {dispatch: false})

}
