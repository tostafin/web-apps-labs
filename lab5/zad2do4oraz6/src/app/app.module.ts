import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AddDishComponent } from './restaurant/add-dish/add-dish.component';
import { CartComponent } from './restaurant/cart/cart.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { HeaderComponent } from './restaurant/header/header.component';
import { CategoryPipe } from './restaurant/Pipes/category.pipe';
import { CuisinePipe } from './restaurant/Pipes/cuisine.pipe';
import { PricePipe } from './restaurant/Pipes/price.pipe';
import { RatingPipe } from './restaurant/Pipes/rating.pipe';
import { HomepageComponent } from './restaurant/homepage/homepage.component';
import { PageNotFoundComponent } from './restaurant/page-not-found/page-not-found.component';
import { DishDetailComponent } from './restaurant/dish-detail/dish-detail.component';
import { MessagesComponent } from './restaurant/messages/messages.component';

import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { EditDishComponent } from './restaurant/edit-dish/edit-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    AddDishComponent,
    CartComponent,
    DishesComponent,
    HeaderComponent,
    CategoryPipe,
    CuisinePipe,
    PricePipe,
    RatingPipe,
    HomepageComponent,
    PageNotFoundComponent,
    DishDetailComponent,
    MessagesComponent,
    EditDishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [CategoryPipe, CuisinePipe, PricePipe, RatingPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
