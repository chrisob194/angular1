import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //@Input() recipe : Recipe;
  recipe: Recipe;
  id : number;

  constructor(private shoppingListService : ShoppingListService,
    private recipeService : RecipeService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  toShoppingList() {
    this.shoppingListService.addRecipeIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
