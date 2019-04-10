import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Wiener-Schnitzel03.jpg/220px-Wiener-Schnitzel03.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/e/e8/Hamburger_sandwich.jpg?uselang=ru',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor(
    // private slService: ShoppingListService,
    // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   // this.slService.addIngredients(ingredients);
  //   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  // }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipeChanged.next(this.recipes.slice());
  // }

  // updateRecipe(index: number, newRecipe: Recipe) {
  //   this.recipes[index] = newRecipe;
  //   this.recipeChanged.next(this.recipes.slice());
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipeChanged.next(this.recipes.slice());
  // }
}
