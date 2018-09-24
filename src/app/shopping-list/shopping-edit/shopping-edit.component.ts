import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;

  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  ingredient: Ingredient;

  constructor(private shoppEditServ: ShoppingListService) { }

  ngOnInit() {

    this.subscription = this.shoppEditServ.itemEditted
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.ingredient = this.shoppEditServ.getIngredient(index);
          this.form.setValue({
            'name': this.ingredient.name,
            'amount': this.ingredient.amount,
          })
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(ngForm: NgForm) {

    const { name, amount } = ngForm.value;

    const newIngredient = new Ingredient(name, amount);

    if (this.editMode) {

      this.shoppEditServ.updateIngredient(this.editedItemIndex, newIngredient);

    } else {

      this.shoppEditServ.addIngredient(newIngredient);
    }

    this.editMode = false;

    // Clear input after emitting event
    ngForm.reset();

  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppEditServ.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
