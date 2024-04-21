import {BeverageInterface} from "./beverage-interface";
import {RecipeStepInterface} from "./recipe-step-interface";

export interface MachineInterface {
  id: string;
  displayText: string;
  state: string;
  currentBeverage: BeverageInterface | null;
  currentStep: RecipeStepInterface | null;
  errorMsg: string | null;
}
