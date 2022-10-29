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
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { EditDishComponent } from './restaurant/edit-dish/edit-dish.component';
import { LoginComponent } from './restaurant/login/login.component';
import { RegisterComponent } from './restaurant/register/register.component';
import { DishesManagerComponent } from './restaurant/dishes-manager/dishes-manager.component';
import { DishesEditComponent } from './restaurant/dishes-edit/dishes-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { AdminViewComponent } from './restaurant/admin-view/admin-view.component';
import { DishDetailEditComponent } from './restaurant/dish-detail-edit/dish-detail-edit.component';
import { DeleteDishDialogComponent } from './restaurant/delete-dish-dialog/delete-dish-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { BanUserDialogComponent } from './restaurant/ban-user-dialog/ban-user-dialog.component';
import { UnbanUserDialogComponent } from './restaurant/unban-user-dialog/unban-user-dialog.component';

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
    EditDishComponent,
    LoginComponent,
    RegisterComponent,
    DishesManagerComponent,
    DishesEditComponent,
    AdminViewComponent,
    DishDetailEditComponent,
    DeleteDishDialogComponent,
    BanUserDialogComponent,
    UnbanUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  providers: [CategoryPipe, CuisinePipe, PricePipe, RatingPipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
