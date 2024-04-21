import {Injectable} from "@angular/core";
import {MilkContainerSettings} from "../../Settings/MilkContainerSettings";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {milkPoured, pourMilk} from "./milk-container.actions";
import {delayWhen, interval, tap, withLatestFrom} from "rxjs";
import {nextStep} from "../Machine/machine.actions";

@Injectable()
export class MilkContainerEffects {
  readonly milksContainerSettings = MilkContainerSettings;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }

  pourMilk$ = createEffect(() => this.actions$.pipe(
    ofType(pourMilk),
    delayWhen((data) => {
      return interval(data.content * this.milksContainerSettings.pouringTime)
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    tap(([data, storeData]) => {
      this.store.dispatch(milkPoured(data));
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})

}
