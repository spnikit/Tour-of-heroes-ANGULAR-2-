import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private subsription: Subscription;
  ingredients: Ingredient[];


  constructor(private shoppingListServ: ShoppingListService) {


  }

  ngOnInit() {
    this.ingredients = this.shoppingListServ.getIngredients();
    this.subsription = this.shoppingListServ.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  editItem(index: number) {

    this.shoppingListServ.itemEditted.next(index);

  }



}
