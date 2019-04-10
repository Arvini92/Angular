import { Effect, Actions, ofType } from "@ngrx/effects";

import * as RecipeActions from '../store/recipe.actions';
import { Injectable } from "@angular/core";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { HttpClient, HttpRequest, HttpParams } from "@angular/common/http";
import { Store } from "@ngrx/store";
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-8f110.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
            })
        }),
        map(
            (recipes: any) => {
              for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                  recipe['ingredients'] = [];
                }
              }
              return {
                  type: RecipeActions.SET_RECIPES,
                  payload: recipes
              };
            }
        )
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 'https://ng-recipe-book-8f110.firebaseio.com/recipes.json',
            state.recipes, { reportProgress: true });
            return this.httpClient.request(req);
        })
    );


    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>
    ) {}
}