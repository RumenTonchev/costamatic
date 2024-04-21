import {Injectable} from "@angular/core";
import {GrinderSettings} from "../../Settings/GrinderSettings";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {beansGrinded, grindBeans} from "./grinder.actions";
import {delayWhen, interval, tap, withLatestFrom} from "rxjs";
import {nextStep} from "../Machine/machine.actions";

@Injectable()
export class GrinderEffects {
  readonly grinderSettings = GrinderSettings;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }

  grindBeans$ = createEffect(() => this.actions$.pipe(
    ofType(grindBeans),
    delayWhen((data) => {
      return interval(data.content * this.grinderSettings.grindTime)
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    tap(([data, storeData]) => {
      this.store.dispatch(beansGrinded());
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})
}
