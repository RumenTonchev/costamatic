import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {makeBeverage, nextStep, setError, turnOn} from "./machine.actions";
import {map, withLatestFrom} from "rxjs";
import {heaterOff, heaterOn} from "../Heater/heater.actions";
import {selectBeansQuantity} from "../BeansContainer/beans-container.selectors";
import {selectMilkContainerQuantity} from "../MilkContainer/milk-container.selectors";
import {selectAllBeverages} from "../Beverages/beverages.selectors";

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
    map(([data, storeData]) => {
      if (storeData.state !== 'on') {
        this.store.dispatch(turnOn());
        this.store.dispatch(heaterOn());
      }
    })
  ), {dispatch: false});

  nextStep$ = createEffect(() => this.actions$.pipe(
    ofType(nextStep),
    withLatestFrom(
      this.store.select(selectBeansQuantity),
      this.store.select(selectMilkContainerQuantity),
      this.store.select(selectAllBeverages)
    ),
    map(([data, coffee, milk, beverages]) => {
      if (data.content?.recipe.length) {
        this.store.dispatch(data.content.recipe[0].stepFn);
      } else {
        this.store.dispatch(heaterOff());
        let hasAvailableRecipe = false;
        const quantities: { [key: string]: number } = {
          coffee: coffee,
          milk: milk
        }
        beverages.forEach((beverage) => {
          let available = true;
          Object.keys(beverage.ingredients).forEach(key => {
            available = available && quantities[key] >= beverage.ingredients[key];
          });
          hasAvailableRecipe = hasAvailableRecipe || available;
        });
        if (!hasAvailableRecipe) {
          this.store.dispatch(setError({content: 'No Available Recipes'}));
        }
      }
    })
  ), {dispatch: false});
}
