import {MilkContainerInterface} from "../../Interfaces/milk-container-interface";
import {createReducer, on} from "@ngrx/store";
import {fillMilk, milkPoured, pourMilk} from "./milk-container.actions";
import {InitialMilkContainer} from "../../Settings/InitialStates";
import {MilkContainerSettings} from "../../Settings/MilkContainerSettings";

export const milkContainerReducer = createReducer(
  InitialMilkContainer,
  on(pourMilk, (state, {content}) => {
    return {
      ...state,
      isPouring: true
    };
  }),
  on(milkPoured, (state, {content}) => {
    return {
      quantity: state.quantity - content,
      isPouring: false
    };
  }),
  on(fillMilk, (state) => {
    return {
      ...state,
      quantity: MilkContainerSettings.capacity
    };
  }),
)
