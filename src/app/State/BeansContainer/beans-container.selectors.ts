import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {BeansContainerInterface} from "../../Interfaces/beans-container-interface";

export const selectBeansContainer = (state: AppState) => state.beansContainer;

export const selectBeansQuantity = createSelector(
  selectBeansContainer,
  (state: BeansContainerInterface) => state.quantity
)
export const selectIsDispensingBeans = createSelector(
  selectBeansContainer,
  (state: BeansContainerInterface) => state.isDispensing
)
export const selectPourCoffeeState = createSelector(
  selectBeansContainer,
  (state: BeansContainerInterface) => state.isPouring
)
