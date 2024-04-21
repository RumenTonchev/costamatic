import {createReducer} from "@ngrx/store";
import {InitialBeverages} from "../../Settings/InitialStates";


export const beveragesReducer = createReducer(
  InitialBeverages,
)
