import {Injectable} from '@angular/core';
import {Dish} from "../Classes/dish";
import {map, Observable, of} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {Users} from "../Interfaces/users";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes: Dish[] = [];
  dishesObs!: Observable<Dish[]>;
  dbPath: string = "dishes3";

  constructor(private authService: AuthService,
              private db: AngularFirestore) {
  }

  getDishes() {
    this.dishesObs = this.db.collection<Dish>(this.dbPath).snapshotChanges().pipe(
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
    const dish = this.dishes.find(d => d.name === dishName[0].toUpperCase() + dishName
      .substring(1).replace(/-/g, ' '))!;
    return of(dish);
  }

  addDish(dish: Dish) {
    return this.db.collection<Dish>(this.dbPath).add({...dish});
  }

  updateDish(dish: Dish) {
    return this.db.collection<Dish>(this.dbPath).doc(dish.id).update(dish);
  }

  deleteDish(dish: Dish) {
    return this.db.collection<Dish>(this.dbPath).doc(dish.id).delete()
  }

  orderDishes(orders: { [key: string]: [number, number, number] }) {
    for (let order of Object.keys(orders)) {
      let dish!: Dish;
      for (let d of this.dishes) {
        if (d.name === order) {
          dish = d;
          break;
        }
      }
      dish.maxDishesPerDay -= orders[order][0];
      this.db.collection<Dish>(this.dbPath).doc(dish.id).update(dish);
      const userRef: AngularFirestoreDocument<Users> = this.db.doc(`users/${this.authService.user?.uid}`);
      let prevOrdersArr!: [{ [key: string]: [number, number, number] }];
      let prevOrdersUpdated = false;
      userRef.valueChanges()
        .subscribe(({prevOrders}: any) => {
          prevOrdersArr = prevOrders;
          this.orderDishesAux(prevOrdersArr, orders, prevOrdersUpdated);
          prevOrdersUpdated = true;
        })
    }
  }

  orderDishesAux(prevOrdersArr: [{ [key: string]: [number, number, number] }],
                 orders: { [key: string]: [number, number, number] },
                 prevOrdersUpdated: boolean) {
    if (!prevOrdersUpdated) {
      prevOrdersArr.push(orders);
      const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.authService.user?.uid}`);
      userRef.update({currOrders: {}})
      userRef.update({prevOrders: prevOrdersArr});
    }
  }
}
