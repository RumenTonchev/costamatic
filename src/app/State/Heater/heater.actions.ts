import {createAction} from "@ngrx/store";

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
