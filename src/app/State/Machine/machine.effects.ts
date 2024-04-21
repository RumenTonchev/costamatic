import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {makeBeverage, nextStep, turnOn} from "./machine.actions";
import {tap, withLatestFrom} from "rxjs";
import {heaterOff, heaterOn} from "../Heater/heater.actions";

@Injectable()
export class MachineEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }

  turnOnHeater$ = createEffect(() => this.actions$.pipe(
    ofType(makeBeverage),
    withLatestFrom(this.store.select(state => state.machine)),
    tap(([data, storeData]) => {
      if (storeData.state !== 'on') {
        this.store.dispatch(turnOn());
        this.store.dispatch(heaterOn());
      }
    })
  ), {dispatch: false});

  nextStep$ = createEffect(() => this.actions$.pipe(
    ofType(nextStep),
    tap(data => {
      if (data.content?.recipe.length) {
        this.store.dispatch(data.content.recipe[0].stepFn);
      } else {
        this.store.dispatch(heaterOff());
      }
    })
  ), {dispatch: false});
}
