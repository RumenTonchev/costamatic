import {createReducer, on} from "@ngrx/store";
import {makeBeverage, nextStep, setError, turnOff, turnOn} from "./machine.actions";
import {InitialMachine} from "../../Settings/InitialStates";

export const machineReducer = createReducer(
  InitialMachine,
  on(makeBeverage, (state, {content}) => {
      return state.state === 'on' ? state : {
        ...state,
        displayText: 'Warming up',
        currentBeverage: content,
      }
    }
  ),
  on(nextStep, (state, {content: RecipeStepInterface}) => {
    if (state.currentBeverage?.recipe.length) {
      const displayText = state.currentBeverage.recipe[0].name;
      const recipeSteps = state.currentBeverage.recipe.filter((obj, idx) => idx != 0);
      return {
        ...state,
        displayText: displayText,
        currentBeverage: {
          ...state.currentBeverage,
          recipe: recipeSteps
        },
        currentStep: state.currentBeverage.recipe[0]
      }
    } else if (state.currentBeverage) {
      return {
        ...state,
        displayText: 'Drink Is Ready/Choose A Drink',
        state: 'stand by',
        currentBeverage: null,
        currentStep: null,
      }
    }
    return state;
  }),
  on(turnOn, (state) => {
    return {
      ...state,
      state: 'on'
    }
  }),
  on(turnOff, (state) => {
    return {
      ...state,
      displayText: 'Choose A Drink',
      state: 'off'
    }
  }),
  on(setError, (state, {content}) => {
    return {
      ...state,
      displayText: 'Choose A Drink',
      state: 'off',
      errorMsg: content ? content : null
    }
  }),
)
