import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AppRoutingModule } from "../app-routing.module";
import { CommonModule } from "@angular/common";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.services";
import { DataStorageService } from "../shared/dataStorage.service";
import { AuthService } from "../auth/auth.service";

@NgModule({
    declarations: [
        HeaderComponent,
        WelcomeComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
    ],
    providers: [ShoppingListService, RecipeService, DataStorageService, AuthService]
})
export class CoreModule {

}