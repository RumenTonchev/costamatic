import {RecipeStepInterface} from "./recipe-step-interface";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {MachineIngredientInterface} from "./machine-ingredient-interface";

export interface BeverageInterface {
  name: string;
  ico: IconProp;
  ingredients: {
    [key: string]: number;
  },
  recipe: RecipeStepInterface[];
}
