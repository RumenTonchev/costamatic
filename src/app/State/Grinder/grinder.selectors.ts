import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {GrinderInterface} from "../../Interfaces/grinder-interface";


export const selectGrinder = (state: AppState) => state.grinder;

export const selectGrinderState = createSelector(
  selectGrinder,
  (state: GrinderInterface) => state.isGrinding
)
