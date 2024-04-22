import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {HeaterInterface} from "../../Interfaces/heater-interface";

export const selectHeater = (state: AppState) => state.heater;
export const selectHeaterOn = createSelector(
  selectHeater,
  (state: HeaterInterface) => state.isHeating
);
export const selectHeaterHot = createSelector(
  selectHeater,
  (state: HeaterInterface) => state.isHot
);

export const selectOfAt = createSelector(
  selectHeater,
  (state: HeaterInterface) => state.ofAt
)
