import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {BeansContainerSettings} from "../../Settings/BeansContainerSettings";
import {beansDispensed, coffeePoured, dispenseBeans, pourCoffee} from "./beans-container.actions";
import {delayWhen, interval, tap, withLatestFrom} from "rxjs";
import {nextStep} from "../Machine/machine.actions";
import {selectBeansQuantity} from "./beans-container.selectors";

@Injectable()
export class BearContainerEffects {
  readonly beansContainerSettings = BeansContainerSettings;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }

  dispenseBeans$ = createEffect(() => this.actions$.pipe(
    ofType(dispenseBeans),
    delayWhen((data) => {
      return interval(data.content * this.beansContainerSettings.dispenseTime);
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    tap(([data, storeData]) => {
      this.store.dispatch(beansDispensed(data));
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})

  beansDispensed$ = createEffect(() => this.actions$.pipe(
    ofType(beansDispensed),
    withLatestFrom(this.store.select(selectBeansQuantity)),
    tap(([data, storeData]) => {
      console.log('beansDispensed', storeData);
    })
  ), {dispatch: false})

  pourCoffee$ = createEffect(() => this.actions$.pipe(
    ofType(pourCoffee),
    delayWhen((data) => {
      return interval(data.content * this.beansContainerSettings.pouringTime)
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    tap(([data, storeData]) => {
      this.store.dispatch(coffeePoured());
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})


}
