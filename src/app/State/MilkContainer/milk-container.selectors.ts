import {AppState} from "../app.state";
import {state} from "@angular/animations";
import {createSelector} from "@ngrx/store";
import {MilkContainerInterface} from "../../Interfaces/milk-container-interface";


export const selectMilkContainer = (state: AppState) => state.milkContainer;

export const selectMilkContainerQuantity = createSelector(
  selectMilkContainer,
  (state: MilkContainerInterface) => state.quantity
)

export const selectPouringMilkState = createSelector(
  selectMilkContainer,
  (state: MilkContainerInterface) => state.isPouring
)
