import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { WelcomeComponent } from "./core/welcome/welcome.component";



const appRoutes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: '', component: WelcomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}