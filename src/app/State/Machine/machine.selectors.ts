import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {MachineInterface} from "../../Interfaces/machine-interface";

export const selectMachine = (state: AppState) => state.machine;
export const selectMachineState = createSelector(
  selectMachine,
  (state: MachineInterface) => state.state
);

export const selectCurrentBeverage = createSelector(
  selectMachine,
  (state: MachineInterface) => state.currentBeverage
);

export const selectDisplayText = createSelector(
  selectMachine,
  (state: MachineInterface) => state.displayText
);
