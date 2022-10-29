import { Injectable } from '@angular/core';
import { Dish } from "../dish";
import {map, Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes: Dish[] = [];
  dishesObs!: Observable<Dish[]>;
  constructor(private db: AngularFirestore) {
  }

  getDishes() {
    this.dishesObs = this.db.collection<Dish>("dishes").snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Dish;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
    this.dishesObs.subscribe(dishes => this.dishes = dishes);
    return this.dishesObs;
  }

  getDish(dishName: string): Observable<Dish> {
    const dish = this.dishes.find(d => d.name === dishName[0].toUpperCase() + dishName.substring(1).replace(/-/g, ' '))!;
    return of(dish);
  }

  addDish(dish: Dish) {
    this.db.collection<Dish>("dishes").add({...dish});
  }

  updateDish(dish: Dish) {
    this.db.collection<Dish>("dishes").doc(dish.id).update(dish);
  }

  deleteDish(dish: Dish) {
    this.db.collection<Dish>("dishes").doc(dish.id).delete()
  }
}
