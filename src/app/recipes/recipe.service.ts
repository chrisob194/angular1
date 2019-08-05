import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipeChanges = new Subject<Recipe[]>();

  private recipes : Recipe[] = [
    new Recipe('Spaghetti alla Carbonara',
    'Piatto tipico della tradizione romana.',
    'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1001491_11.jpg?itok=-ns0A_kt',
    [
      new Ingredient('Spaghetti',150),
      new Ingredient('Uova',2),
      new Ingredient('Guanciale',120)
    ]),
    new Recipe('Pasta al Pesto',
    'Piatto tipico della tradizione genovese',
    'https://www.lospicchiodaglio.it/img/ricette/pastapesto.jpg',
    [
      new Ingredient('Penne',150),
      new Ingredient('Origano',60),
      new Ingredient('Olio',20)
    ])
  ];

  constructor() { }

  getRecipes() : Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id : number) {
    return this.recipes[id];
  }

  newRecipe(recipe : Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(index : number, newRecipe : Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index : number) {
    this.recipes.splice(index,1);
    this.recipeChanges.next(this.recipes.slice());
  }

  setRecipes(recipes : Recipe[]) {
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }

}
