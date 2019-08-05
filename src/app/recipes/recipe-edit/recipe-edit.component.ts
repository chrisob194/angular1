import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number;
  editMode = false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute,
              private recipeService : RecipeService,
              private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[
          Validators.required, 
          Validators.pattern(/[1-9][0-9]*/)
        ])
      })
    );
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    //console.log(this.recipeForm);
    const recipeFormValue = this.recipeForm.value;
    const newRecipe = new Recipe(recipeFormValue['name'],recipeFormValue['desc'],recipeFormValue['imagePath'],recipeFormValue['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id,newRecipe);
    } else {
      this.recipeService.newRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    // ingredients
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe['ingredients']) { //se la ricetta che sto aprenda ha degli ingredienti
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [
                Validators.required, 
                Validators.pattern(/[1-9][0-9]*/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'desc' : new FormControl(recipeDesc, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  onDeleteIngredient(index : number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
