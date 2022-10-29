import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HeaderComponent } from './restaurant/header/header.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { AddDishComponent } from './restaurant/add-dish/add-dish.component';
import { CategoryPipe } from './restaurant/Pipes/category.pipe';
import { CuisinePipe } from './restaurant/Pipes/cuisine.pipe';
import { PricePipe } from './restaurant/Pipes/price.pipe';
import { RatingPipe } from './restaurant/Pipes/rating.pipe';
import { CartComponent } from './restaurant/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HeaderComponent,
    DishesComponent,
    AddDishComponent,
    CategoryPipe,
    CuisinePipe,
    PricePipe,
    RatingPipe,
    CartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
