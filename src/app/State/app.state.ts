import {MachineInterface} from "../Interfaces/machine-interface";
import {HeaterInterface} from "../Interfaces/heater-interface";
import {BeansContainerInterface} from "../Interfaces/beans-container-interface";
import {GrinderInterface} from "../Interfaces/grinder-interface";
import {MilkContainerInterface} from "../Interfaces/milk-container-interface";
import {BeverageInterface} from "../Interfaces/beverage-interface";

export interface AppState {
  machine: MachineInterface,
  heater: HeaterInterface,
  beansContainer: BeansContainerInterface,
  grinder: GrinderInterface,
  milkContainer: MilkContainerInterface,
  beverages: BeverageInterface[]
}
