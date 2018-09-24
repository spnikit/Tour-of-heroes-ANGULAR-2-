import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    private ingredients: Ingredient[];
    ingredientsChanged = new Subject<Ingredient[]>();
    itemEditted = new Subject<number>();

    constructor() {
        this.ingredients = [
            new Ingredient('Apple', 5),
            new Ingredient('Tomato', 3)
        ]
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    getIngredients(): Ingredient[] {
        return [...this.ingredients];
    }

    addIngredient(ingred: Ingredient): void {
        this.ingredients.push(ingred);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    updateIngredient(index: number, ingred: Ingredient) {
        this.ingredients[index] = ingred;
        this.ingredientsChanged.next([...this.ingredients]);
    }

    deleteIngredient(index: number) {
        this.ingredients = this.ingredients.filter((item, idx) => {
            return idx !== index
        });
        this.ingredientsChanged.next([...this.ingredients]);
    }


}