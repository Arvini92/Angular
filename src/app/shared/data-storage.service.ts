import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
// import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    // private http: Http,
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
    ) {}

  storeRecipes() {
    const token = this.authService.getToken();

    /*return this.http.put('https://ng-recipe-book-8f110.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes()
    );*/
    // return this.httpClient.put('https://ng-recipe-book-8f110.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'events',
    //     params: new HttpParams().set('auth', token)
    //     // headers: new HttpHeaders().set('Authorization', 'Bearer dfhvyy')
    //   });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-8f110.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        reportProgress: true,
        params: new HttpParams().set('auth', token)
      });
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    /*this.http.get('https://ng-recipe-book-8f110.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )*/
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-8f110.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-8f110.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )

      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
