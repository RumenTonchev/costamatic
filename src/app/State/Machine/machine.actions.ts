import {createAction, props} from "@ngrx/store";
import {BeverageInterface} from "../../Interfaces/beverage-interface";


export const makeBeverage = createAction(
  '[BUTTON] Make Beverage',
  props<{ content: BeverageInterface }>()
);

export const nextStep = createAction(
  '[ANY] Next Step',
  props<{ content: BeverageInterface | null }>()
);
export const turnOn = createAction(
  '[ANY] Turn on'
);
export const turnOff = createAction(
  '[ANY] Turn Off'
);
export const setError = createAction(
  '[ANY] Set Error',
  props<{ content: string }>()
);
