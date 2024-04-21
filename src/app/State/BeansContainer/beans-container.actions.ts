import {createAction, props} from "@ngrx/store";

export const dispenseBeans = createAction(
  '[MACHINE] Dispense Beans',
  props<{ content: number }>()
);
export const beansDispensed = createAction(
  '[BEANS CONTAINER] Beans Dispensed',
  props<{ content: number }>()
);
export const fillBeans = createAction(
  '[OUTER] Fill Beans',
);
export const pourCoffee = createAction(
  '[MACHINE] Pour Coffee',
  props<{ content: number }>()
);
export const coffeePoured = createAction(
  '[BEANS CONTAINER] Coffee Poured'
);
