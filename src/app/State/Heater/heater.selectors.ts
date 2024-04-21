import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {MachineInterface} from "../../Interfaces/machine-interface";
import {HeaterInterface} from "../../Interfaces/heater-interface";

export const selectHeater = (state: AppState) => state.heater;
export const selectHeaterOn = createSelector(
  selectHeater,
  (state: HeaterInterface) => state?.isHeating
);
export const selectHeaterHot = createSelector(
  selectHeater,
  (state: HeaterInterface) => state?.isHot
);
