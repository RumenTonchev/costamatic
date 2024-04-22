import {BeansContainerInterface} from "../Interfaces/beans-container-interface";
import {BeverageInterface} from "../Interfaces/beverage-interface";
import {dispenseBeans, pourCoffee} from "../State/BeansContainer/beans-container.actions";
import {grindBeans} from "../State/Grinder/grinder.actions";
import {pourMilk} from "../State/MilkContainer/milk-container.actions";
import {GrinderInterface} from "../Interfaces/grinder-interface";
import {HeaterInterface} from "../Interfaces/heater-interface";
import {MachineInterface} from "../Interfaces/machine-interface";
import {MilkContainerInterface} from "../Interfaces/milk-container-interface";

export const InitialBeansContainer: BeansContainerInterface = {
  isDispensing: false,
  isPouring: false,
  quantity: 10,
}

export const InitialMilkContainer: MilkContainerInterface = {
  isPouring: false,
  quantity: 5,
}

export const InitialBeverages: BeverageInterface[] = [
  {
    name: 'coffee',
    ico: ['fas', 'glass-water'],
    ingredients: {
      coffee: 1,
    },
    recipe: [
      {
        name: 'Dispensing Coffee Beans',
        stepFn: dispenseBeans({content: 1}),
        amount: 1
      },
      {
        name: 'Grinding Coffee Beans',
        stepFn: grindBeans({content: 1}),
        amount: 1
      },
      {
        name: 'Pouring Coffee',
        stepFn: pourCoffee({content: 1}),
        amount: 1
      },
    ]
  },
  {
    name: 'coffee & milk',
    ico: ['fas', 'glass-water-droplet'],
    ingredients: {
      coffee: 1,
      milk: 1
    },
    recipe: [
      {
        name: 'Dispensing Coffee Beans',
        stepFn: dispenseBeans({content: 1}),
        amount: 1
      },
      {
        name: 'Grinding Coffee Beans',
        stepFn: grindBeans({content: 1}),
        amount: 1
      },
      {
        name: 'Pouring Coffee',
        stepFn: pourCoffee({content: 1}),
        amount: 1
      },
      {
        name: 'Pouring Milk',
        stepFn: pourMilk({content: 1}),
        amount: 1
      }
    ]
  },
]

export const InitialGrinder: GrinderInterface = {
  isGrinding: false,
}

export const InitialHeater: HeaterInterface = {
  isHeating: false,
  isHot: false,
  ofAt: new Date(),
};

export const InitialMachine: MachineInterface = {
  id: 'COFFEE-69',
  state: 'off',
  displayText: 'Choose A Drink',
  currentBeverage: null,
  currentStep: null,
  errorMsg: null,
};

