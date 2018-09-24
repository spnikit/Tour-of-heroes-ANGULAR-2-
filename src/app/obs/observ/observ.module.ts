import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { UserComponent } from '../user/user.component';
import { ServerService } from '../server.service';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: 'user/1', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [HeaderComponent, UserComponent],
  exports: [HeaderComponent, RouterModule],
  providers: [ServerService]
})
export class ObservModule { }
