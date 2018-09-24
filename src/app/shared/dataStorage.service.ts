import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.services";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(
        private http: Http,
        private recipeServ: RecipeService,
        private authServ: AuthService
    ) { }

    storeRecipes(): Observable<Response> {
        const token = this.authServ.getToken();
        return this.http.put(`https://ng-recipes-bf43b.firebaseio.com/data.json?auth=${token}`, this.recipeServ.getRecipes());
    }

    fetchRecipes(): Observable<Recipe[]> {
        const token = this.authServ.getToken();
        return this.http.get(`https://ng-recipes-bf43b.firebaseio.com/data.json?auth=${token}`).pipe(
            map((response: Response) => {
                const recipes: Recipe[] = response.json();

                recipes.forEach((recipe: Recipe) => {
                    if (!recipe.hasOwnProperty('ingredients')) {
                        recipe['ingredients'] = [];
                    }
                })
                return recipes;
            })
        )
    }
}