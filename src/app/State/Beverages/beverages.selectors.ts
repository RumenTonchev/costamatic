import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {BeverageInterface} from "../../Interfaces/beverage-interface";

export const selectBeverages = (state: AppState) => state.beverages;

export const selectAllBeverages = createSelector(
  selectBeverages,
  (state: BeverageInterface[]) => state
)
