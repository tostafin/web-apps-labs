import {Injectable} from '@angular/core';
import {Dish} from "../Classes/dish";
import {DishService} from "./dish.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  ordersCnt: number = 0;
  currCurrency: string = "$";
  totalSum: number = 0;
  exchangeRate: number = 1;
  euroToDollar: number = 0.88;
  maxPrice: number = -1;
  minPrice: number = Number.MAX_SAFE_INTEGER;
  filterMaxPrice: number = -1;
  filterMinPrice: number = Number.MAX_SAFE_INTEGER;
  orders: { [key: string]: [number, number, number] } = {};  //K: dishName, V: [numOfOrders][dishPrice][sumOfThisDish]
  dishes: Dish[] = [];

  constructor(private dishService: DishService,
              private db: AngularFirestore,
              private authService: AuthService) {
  }

  addOrder(dish: Dish) {
    this.orders[dish.name][0]++;
    this.orders[dish.name][2] += dish.price;
    this.updateOrders();
  }

  removeOrder(dish: Dish) {
    this.orders[dish.name][0]--;
    this.orders[dish.name][2] -= dish.price;
    this.updateOrders();
  }

  checkIfMinDishCnt(dish: Dish) {
    return this.orders[dish.name][0] === 0;
  }

  checkIfMaxDishCnt(dish: Dish) {
    return this.orders[dish.name][0] === dish.maxDishesPerDay;
  }

  getDishesCnt() {
    for (let dish of this.dishes) {
      this.orders[dish.name] = [0, dish.price, 0];
    }

    this.db.doc(`users/${this.authService.user?.uid}`).valueChanges()
      .subscribe(({currOrders}: any) => {
          this.getDishesCntAux(currOrders);
        }
      );
  }

  getDishesCntAux(orders: { [key: string]: [number, number, number] }) {
    this.ordersCnt = 0;
    for (let order of Object.keys(orders)) {
      const numOfOrders: number = orders[order][0];
      this.ordersCnt += numOfOrders;
      this.orders[order] = [orders[order][0], orders[order][1], orders[order][2]];
    }
  }

  // deleteDish(dish: Dish) {
  //   this.orders = this.orders.filter(([name, price]) => name !== dish.name || price !== dish.price)
  //   this.ordersUpdated = this.orders;
  //
  // }

  changeCurrency() {
    if (this.currCurrency === "$") {
      this.currCurrency = "€";
      this.exchangeRate = this.euroToDollar;
      this.filterMinPrice = Math.round(this.filterMinPrice * this.exchangeRate);
      this.filterMaxPrice = Math.round(this.filterMaxPrice * this.exchangeRate);
      this.updateOrders();

    } else {
      this.currCurrency = "$";
      this.exchangeRate = 1;
      this.filterMinPrice = this.minPrice;
      this.filterMaxPrice = this.maxPrice;
      this.updateOrders();
    }
  }

  updateOrders() {
    const ordersToAdd: { [key: string]: [number, number, number] } = {};
    for (let order of Object.keys(this.orders)) {
      this.orders[order][2] = this.orders[order][0] * Math.round(this.orders[order][1] * this.exchangeRate)
      if (this.orders[order][0] !== 0) {
        ordersToAdd[order] = [this.orders[order][0], this.orders[order][1], this.orders[order][2]];
      }
    }
    this.db.doc(`users/${this.authService.user?.uid}`).update({currOrders: ordersToAdd});
    this.calculateTotalSum();
  }

  calculateTotalSum() {
    this.db.doc(`users/${this.authService.user?.uid}`).valueChanges()
      .subscribe(({ currOrders}: any) => {
          this.calculateSum(currOrders);
        }
      );
  }

  calculateSum(orders: { [key: string]: [number, number, number] }) {
    this.totalSum = 0;
    this.ordersCnt = 0;
    for (let order of Object.keys(orders)) {
      this.totalSum += orders[order][2];
      this.ordersCnt += orders[order][0];
    }
  }

  roundNum(x: number) {
    return Math.round(x);
  }

  getDishes(): void {
    if (!this.dishes.length) {
      this.dishService.getDishes().subscribe(dishes => {
        this.dishes = dishes
        this.getDishesCnt();
      });
    }
  }
}
