import {Injectable} from '@angular/core';
import {Dish} from "../dish";
import {DishService} from "./dish.service";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  orderCnt: number = 0;
  currCurrency: string = "$";
  totalSum: number = 0;
  exchangeRate: number = 1;
  euroToDollar: number = 1.13;
  orders: [string, number][] = [];
  maxPrice: number = -1;
  minPrice: number = Number.MAX_SAFE_INTEGER;
  filterMaxPrice: number = -1;
  filterMinPrice: number = Number.MAX_SAFE_INTEGER;
  ordersGrouped: [string, number, number][] = [];  //A[dishName][numberOfOrders][sumOfThisDish]
  ordersUpdated: [string, number][] = []

  dishesCnt: { [key: string]: number } = {};
  dishes: Dish[] = [];

  constructor(private dishService: DishService) {
  }

  addOrder(dish: Dish) {
    this.dishesCnt[dish.name]++;
    this.orderCnt++;
    this.totalSum += dish.price;
    this.orders.push([dish.name, dish.price]);
    this.calculateSum();
  }

  removeOrder(dish: Dish) {
    this.dishesCnt[dish.name]--;
    this.orderCnt--;
    this.totalSum -= dish.price;
    this.orders.splice(this.orders.indexOf([dish.name, dish.price]), 1);
    this.calculateSum();
  }

  checkIfMinDishCnt(dish: Dish) {
    return this.dishesCnt[dish.name] === 0;
  }

  checkIfMaxDishCnt(dish: Dish) {
    return this.dishesCnt[dish.name] === dish.maxDishesPerDay;
  }

  getDishesCnt() {
    if (Object.keys(this.dishesCnt).length === 0 && this.dishesCnt && Object.getPrototypeOf(this.dishesCnt) === Object.prototype) {
      for (let i of this.dishes) {
        this.dishesCnt[i.name] = 0;
      }
    }
  }

  deleteDish(dish: Dish) {
    this.orders = this.orders.filter(([name, price]) => name !== dish.name || price !== dish.price)
    this.ordersUpdated = this.orders;
    this.calculateSum();
  }

  changeCurrency() {
    if (this.currCurrency === "$") {
      this.currCurrency = "€";
      this.exchangeRate = this.euroToDollar;
      this.filterMinPrice = Math.round(this.filterMinPrice * this.exchangeRate);
      this.filterMaxPrice = Math.round(this.filterMaxPrice * this.exchangeRate);
      this.ordersUpdated = this.orders.map(v => [v[0], this.roundNum(v[1] * this.exchangeRate)]);
      this.groupOrders();

    } else {
      this.currCurrency = "$";
      this.exchangeRate = 1;
      this.filterMinPrice = this.minPrice;
      this.filterMaxPrice = this.maxPrice;
      this.ordersUpdated = this.orders;
      this.groupOrders();
    }
  }

  groupOrders() {
    this.ordersGrouped = [];
    if (this.ordersUpdated.length === 0) this.ordersUpdated = this.orders;
    for (let o1 of this.ordersUpdated) {
      let found = false;
      for (let o2 of this.ordersGrouped) {
        if (o2[0] === o1[0]) {
          o2[1]++;
          o2[2] += o1[1];
          found = true;
          break;
        }
      }
      if (!found) this.ordersGrouped.push([o1[0], 1, o1[1]]);
      this.calculateTotalSum();
    }
  }

  calculateTotalSum() {
    this.totalSum = 0;
    for (let order of this.ordersUpdated) {
      this.totalSum += order[1];
    }
  }

  roundNum(x: number) {
    return Math.round(x);
  }

  calculateSum() {
    let totalSum: number = 0;
    for (let i of this.orders) {
      totalSum += i[1];
    }
    this.totalSum = totalSum;
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
