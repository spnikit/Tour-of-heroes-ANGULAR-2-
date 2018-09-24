import { Component } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.services';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/dataStorage.service';
import { Recipe } from '../../recipes/recipe.model';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private dataStorageServ: DataStorageService,
        private recipeServ: RecipeService,
        private authService: AuthService
    ) { }

    onSaveData() {
        this.dataStorageServ.storeRecipes()
            .subscribe(
                (resp: Response) => console.log(resp),
                (err => console.log(err))
            )
    }

    onFetchData() {
        this.dataStorageServ.fetchRecipes()
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeServ.updateRecipes(recipes);
                    console.log('recipes fetched!');
                }
            )
    }

    onLogOut() {
        this.authService.logout();
    }

}