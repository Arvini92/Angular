import * as ShoppingListActions from './shopping-list.action';

import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State
}

export interface State {
  ingredients: Ingredient[];
  editedIngedient: Ingredient;
  editedIngedientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngedient: null,
  editedIngedientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
    return {
      ...state,
      ingredients: [
        ...state.ingredients,
        ...action.payload
      ]
    };
    case ShoppingListActions.UPDATE_INGREDIENT:
    const ingredient = state.ingredients[state.editedIngedientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.payload.ingredient
    };
    const ingredients = [...state.ingredients];
    ingredients[state.editedIngedientIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: ingredients,
      editedIngedient: null,
      editedIngedientIndex: -1
    };
    case ShoppingListActions.DELETE_INGREDIENT:
    const oldIngredients = [...state.ingredients];
    oldIngredients.splice(state.editedIngedientIndex, 1);
    return {
      ...state,
      ingredients: oldIngredients,
      editedIngedient: null,
      editedIngedientIndex: -1
    };
    case ShoppingListActions.START_EDIT:
    const editedIngedient = {...state.ingredients[action.payload]};
    return {
      ...state,
      editedIngedient: editedIngedient,
      editedIngedientIndex: action.payload
    };
    case ShoppingListActions.STOP_EDIT:
    return {
      ...state,
      editedIngedient: null,
      editedIngedientIndex: -1
    };
    default:
      return state;
  }
}
