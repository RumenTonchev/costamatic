import {createAction, props} from "@ngrx/store";

export const grindBeans = createAction(
  "[MACHINE] Grind Beans",
  props<{ content: number }>()
);
export const beansGrinded = createAction(
  "[GRINDER] Beans Grinded"
);
