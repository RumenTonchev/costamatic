import {Injectable} from "@angular/core";
import {MilkContainerSettings} from "../../Settings/MilkContainerSettings";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {fillMilk, milkPoured, pourMilk} from "./milk-container.actions";
import {delayWhen, interval, map, tap, withLatestFrom} from "rxjs";
import {nextStep, setError} from "../Machine/machine.actions";
import {CloudService} from "../../services/cloud.service";
import {selectMilkContainerQuantity} from "./milk-container.selectors";
import {fillBeans} from "../BeansContainer/beans-container.actions";

@Injectable()
export class MilkContainerEffects {
  readonly milksContainerSettings = MilkContainerSettings;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cloudService: CloudService,
  ) {
  }

  pourMilk$ = createEffect(() => this.actions$.pipe(
    ofType(pourMilk),
    delayWhen((data) => {
      return interval(data.content * this.milksContainerSettings.pouringTime)
    }),
    withLatestFrom(this.store.select(state => state.machine)),
    map(([data, storeData]) => {
      this.store.dispatch(milkPoured(data));
      this.store.dispatch(nextStep({content: storeData.currentBeverage}));
    })
    // map(([data, storeData]) => {
    // })
  ), {dispatch: false})

  milkPoured$ = createEffect(() => this.actions$.pipe(
    ofType(milkPoured),
    withLatestFrom(this.store.select(selectMilkContainerQuantity)),
    map(([data, storeData]) => {
      if (storeData <= 0) {
        this.cloudService.sendMessage({
          type: 'error',
          message: 'Machine is out of milk'
        });
      }
    }),
  ), {dispatch: false})

  fillMilk$ = createEffect(() => this.actions$.pipe(
    ofType(fillMilk),
    map(() => {
      this.cloudService.sendMessage({
        type: 'success',
        message: 'Machine filled with milk'
      });
      this.store.dispatch(setError({content: ''}));
    })
  ), {dispatch: false})
}
