import {createAction, props} from "@ngrx/store";

export const pourMilk = createAction(
  '[MACHINE] Pour Milk',
  props<{ content: number }>()
)
export const milkPoured = createAction(
  '[MACHINE] Milk Poured',
  props<{ content: number }>()
)

export const fillMilk = createAction(
  '[OUTER] Fill Milk',
)
