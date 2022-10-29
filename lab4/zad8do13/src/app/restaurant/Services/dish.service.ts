import { Injectable } from '@angular/core';
import { Dish } from "../dish";
import { DISHES } from "../mock-dishes";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    const dishes = of(DISHES);
    return dishes;
  }
}
