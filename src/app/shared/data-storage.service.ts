import { map, tap } from 'rxjs/operators';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient,
              private recipeService : RecipeService) { }

  storeRecipes() {
    const recipes : Recipe[] = this.recipeService.getRecipes();
    // in questo caso con firebase, put sovrascrive tutti i precedenti record
    this.http.put('https://ng-recipe-fde31.firebaseio.com/recipes.json',recipes)
      .subscribe(response => {
        console.log(response)
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipe-fde31.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // se esistono degli ingredienti per questa ricetta, li lascio, altrimenti, li inizializzo come vuoti
            return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
          });
        }),
        tap(recipes => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
