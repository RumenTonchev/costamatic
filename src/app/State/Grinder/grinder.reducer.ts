import {createReducer, on} from "@ngrx/store";
import {beansGrinded, grindBeans} from "./grinder.actions";
import {InitialGrinder} from "../../Settings/InitialStates";


export const grinderReducer = createReducer(
  InitialGrinder,
  on(grindBeans, (state, {content}) => {
    return {isGrinding: true};
  }),
  on(beansGrinded, (state) => {
    return {isGrinding: false};
  }),
)
