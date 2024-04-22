import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {BeansContainerSettings} from "../../Settings/BeansContainerSettings";
import {beansDispensed, coffeePoured, dispenseBeans, fillBeans, pourCoffee} from "./beans-container.actions";
import {delayWhen, interval, map, withLatestFrom} from "rxjs";
import {nextStep, setError} from "../Machine/machine.actions";
import {selectBeansQuantity} from "./beans-container.selectors";
import {CloudService} from "../../services/cloud.service";

@Injectable()
export class BearContainerEffects {
  readonly beansContainerSettings = BeansContainerSettings;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cloudService: CloudService,
  ) {
  }

  dispenseBeans$ = createEffect(() => this.actions$.pipe(
    ofType(dispenseBeans),
    delayWhen((data) => {
      return interval(data.content * this.beansContainerSettings.dispenseTime);
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    map(([data, storeData]) => {
      this.store.dispatch(beansDispensed(data));
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})

  beansDispensed$ = createEffect(() => this.actions$.pipe(
    ofType(beansDispensed),
    withLatestFrom(this.store.select(selectBeansQuantity)),
    map(([data, storeData]) => {
      if (storeData <= 0) {
        this.cloudService.sendMessage({
          type: 'error',
          message: 'Machine is out of coffee'
        });
      }
    })
  ), {dispatch: false})

  pourCoffee$ = createEffect(() => this.actions$.pipe(
    ofType(pourCoffee),
    delayWhen((data) => {
      return interval(data.content * this.beansContainerSettings.pouringTime)
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    map(([data, storeData]) => {
      this.store.dispatch(coffeePoured());
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
  ), {dispatch: false})

  fillBeans$ = createEffect(() => this.actions$.pipe(
    ofType(fillBeans),
    map(() => {
      this.cloudService.sendMessage({
        type: 'success',
        message: 'Machine filled with coffee'
      });
      this.store.dispatch(setError({content: ''}));
    })
  ), {dispatch: false})


}
