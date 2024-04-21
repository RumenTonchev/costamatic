import {MachineIngredientInterface} from "./machine-ingredient-interface";
import {BeverageInterface} from "./beverage-interface";

export interface MachineInterface {
  id: string;
  displayText: string;
  state: string;
  currentBeverage: BeverageInterface | null
}
