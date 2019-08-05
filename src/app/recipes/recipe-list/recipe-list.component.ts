import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes : Recipe[];

  private subscription : Subscription;

  constructor(private recipeService : RecipeService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeChanges.subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes
      }
    );
  }

  newRecipe() {
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
