import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[];
  private slSubscription : Subscription;

  selectedIngredient : Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.slSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.slSubscription.unsubscribe();
  }

  onEditItem(index : number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
