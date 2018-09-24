import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;
  id: number;

  constructor(
    private shoppListServ: ShoppingListService,
    private recipeServ: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipeServ.getRecipe(+this.id);

      })

  }

  addToShoppingList(): void {
    this.shoppListServ.addIngredients(this.recipeDetail.ingredients);
  }

  onDelete() {
    this.recipeServ.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
