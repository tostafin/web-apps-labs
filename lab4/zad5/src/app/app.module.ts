import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { DisplayCarDetailComponent } from './display-car-detail/display-car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailComponent,
    DisplayCarDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
