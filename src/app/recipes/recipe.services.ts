import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {

    recepiesUpdated = new Subject<Recipe[]>();
    selectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [];

    constructor() {
        this.recipes = [
            new Recipe(
                'a test recipe',
                'my test recipe', 'https://c.pxhere.com/photos/08/fc/food_dish_rice_thailand_food_thailand_shrimp_fast_food_the_pork_fried_rice_made-1377212.jpg!d',
                [
                    new Ingredient('Meat', 1),
                    new Ingredient('French Fries', 20)
                ]),
            new Recipe(
                'second recipe',
                'what a delicious taste',
                'https://www.cbc.ca/food/content/images/recipes/WinterVegPie.jpg',
                [
                    new Ingredient('Potato', 5),
                    new Ingredient('Fish', 2)
                ])

        ];
    }


    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recepiesUpdated.next([...this.recipes]);
    }

    updateRecipe(idx: number, newRecipe: Recipe) {
        this.recipes[idx] = newRecipe;
        this.recepiesUpdated.next([...this.recipes]);
    }

    updateRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recepiesUpdated.next([...this.recipes]);
    }

    deleteRecipe(idx: number) {
        this.recipes = this.recipes.filter((recipe, index: number) => idx !== index);
        this.recepiesUpdated.next([...this.recipes]);
    }


}