import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // sostituisco con subject
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients : Ingredient[] = [
    new Ingredient("Apple",10),
    new Ingredient("Mango",5),
    new Ingredient("Strawberry",20)
  ];

  constructor() { }

  getIngredient(index : number) {
    return this.ingredients[index];
  }

  getIngredients() : Ingredient[] {
    return this.ingredients.slice();
  } 

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addRecipeIngredients(selectedIngredients : Ingredient[]) {
    this.ingredients.push(...selectedIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index : number, item : Ingredient) {
    this.ingredients[index] = item;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index : number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }


}
