import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() newIngredient = new EventEmitter<Ingredient>();

  @ViewChild('f',{static:false}) slForm : NgForm;

  editingSub : Subscription;
  editMode = false;
  editingItemIndex : number;
  editingItem : Ingredient;


  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.editingSub = this.shoppingListService.startedEditing.subscribe(
      (index : number) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.editingItem = this.shoppingListService.getIngredient(this.editingItemIndex);
        this.slForm.setValue({
          name : this.editingItem.name,
          amount : this.editingItem.amount
        });
      }
    );
  }

  /*onAddItem(name : string, amount : number) {
    //this.newIngredient.emit(new Ingredient(name,amount));
    this.shoppingListService.addIngredient(new Ingredient(name,amount));
  }*/

  onAddItem(form : NgForm) {
    if (this.editMode === true) {
      this.shoppingListService.updateIngredient(this.editingItemIndex,new Ingredient(form.value.name,form.value.amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(form.value.name,form.value.amount));
    }
    this.editMode = false;
    form.reset();
  }

  clearForm(form : NgForm) {
    form.reset();
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.editMode = false;
    this.slForm.reset();
  }
}
