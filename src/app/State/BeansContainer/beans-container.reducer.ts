import {createReducer, on} from "@ngrx/store";
import {beansDispensed, coffeePoured, dispenseBeans, fillBeans, pourCoffee} from "./beans-container.actions";
import {InitialBeansContainer} from "../../Settings/InitialStates";
import {BeansContainerSettings} from "../../Settings/BeansContainerSettings";

export const beansContainerReducer = createReducer(
  InitialBeansContainer,
  on(dispenseBeans, (state, {content}) => {
    return {
      ...state,
      isDispensing: true
    };
  }),
  on(beansDispensed, (state, {content}) => {
    return {
      ...state,
      isDispensing: false,
      quantity: state.quantity - content,
    };
  }),
  on(fillBeans, (state) => {
    return {
      ...state,
      quantity: BeansContainerSettings.capacity
    };
  }),
  on(pourCoffee, (state, {content}) => {
    return {
      ...state,
      isPouring: true
    }
  }),
  on(coffeePoured, (state) => {
    return {
      ...state,
      isPouring: false
    }
  })
)
