import {createAction, props} from "@ngrx/store";
import {BeverageInterface} from "../../Interfaces/beverage-interface";


// export const makeBeverage = createAction(
//   '[MACHINE] Make Beverage',
//   props<{ content: BeverageInterface }>()
// );
//
// export const nextStep = createAction(
//   '[ANY] Next Step'
// );

export const heaterOn = createAction(
  '[HEATER] Heater On',
);

export const heaterOff = createAction(
  '[HEATER] Heater Off',
)

export const isHot = createAction(
  '[MACHINE] Is Hot',
)

export const isCold = createAction(
  '[MACHINE] Is Cold',
)
