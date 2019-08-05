import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe : Recipe;
  private recipeSubscription : Subscription;

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipeSelected.subscribe(
      (recipe : Recipe) => {
        this.selectedRecipe = recipe;
      } 
    );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
