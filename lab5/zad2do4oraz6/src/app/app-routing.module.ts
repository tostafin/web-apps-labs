import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomepageComponent} from "./restaurant/homepage/homepage.component";
import {DishesComponent} from "./restaurant/dishes/dishes.component";
import {AddDishComponent} from "./restaurant/add-dish/add-dish.component";
import {CartComponent} from "./restaurant/cart/cart.component";
import {PageNotFoundComponent} from "./restaurant/page-not-found/page-not-found.component";
import {DishDetailComponent} from "./restaurant/dish-detail/dish-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'dishes', component: DishesComponent},
  {path: 'dishes/:name', component: DishDetailComponent},
  {path: 'add-dish', component: AddDishComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
