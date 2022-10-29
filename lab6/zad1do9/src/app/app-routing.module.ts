import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomepageComponent} from "./restaurant/homepage/homepage.component";
import {DishesComponent} from "./restaurant/dishes/dishes.component";
import {AddDishComponent} from "./restaurant/add-dish/add-dish.component";
import {CartComponent} from "./restaurant/cart/cart.component";
import {PageNotFoundComponent} from "./restaurant/page-not-found/page-not-found.component";
import {DishDetailComponent} from "./restaurant/dish-detail/dish-detail.component";
import {LoginComponent} from "./restaurant/login/login.component";
import {RegisterComponent} from "./restaurant/register/register.component";
import {AuthGuard} from "./restaurant/Guards/auth.guard";
import {DishesManagerComponent} from "./restaurant/dishes-manager/dishes-manager.component";
import {DishesEditComponent} from "./restaurant/dishes-edit/dishes-edit.component";
import {AdminViewComponent} from "./restaurant/admin-view/admin-view.component";
import {DishDetailEditComponent} from "./restaurant/dish-detail-edit/dish-detail-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'dishes', component: DishesComponent},
  {
    path: 'dishes/:name',
    component: DishDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        client: true,
        manager: true,
        admin: true
      }
    }
  },
  {
    path: 'dishes-manager',
    component: DishesManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        manager: true,
        admin: true
      }
    }
  },
  {
    path: 'admin-view',
    component: AdminViewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        admin: true
      }
    }
  },
  {
    path: 'dishes-edit',
    component: DishesEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        manager: true,
        admin: true
      }
    }
  },
  {
    path: 'dishes-edit/:name',
    component: DishDetailEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        manager: true,
        admin: true
      }
    }
  },
  {
    path: 'add-dish',
    component: AddDishComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        manager: true,
        admin: true
      }
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: {
      roles: {
        client: true,
        manager: true,
        admin: true
      }
    }
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
