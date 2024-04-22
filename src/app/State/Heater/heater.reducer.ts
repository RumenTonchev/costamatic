import {createReducer, on} from "@ngrx/store";
import {heaterOff, heaterOn, isCold, isHot} from "./heater.actions";
import {InitialHeater} from "../../Settings/InitialStates";

export const heaterReducer = createReducer(
  InitialHeater,
  on(heaterOn, (state) => {
    return {
      ...state,
      isHeating: true
    }
  }),
  on(heaterOff, (state) => {
    return {
      ...state,
      ofAt: new Date(),
      isHeating: false
    }
  }),
  on(isHot, (state) => {
    return {
      ...state,
      isHot: true
    }
  }),
  on(isCold, (state) => ({
    ...state,
    isHot: false
  })),
)
