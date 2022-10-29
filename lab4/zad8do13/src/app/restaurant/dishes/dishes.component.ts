import { Component, OnInit } from '@angular/core';
import { Dish } from "../dish";
import { DishService } from "../Services/dish.service";
import { OrderDetailsService } from "../Services/order-details.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  dishesCnt: { [key: string]: number } = {};
  mostExpensiveDish: string = "";
  cheapestDish: string = "";
  ratings: { [key: string]: number } = {};

  uniqueCuisines: Set<string> = new Set();
  cuisineFilter: Set<string> = new Set();

  uniqueCategories: Set<string> = new Set();
  categoryFilter: Set<string> = new Set();

  ratingFilter: boolean[] = [false, false, false, false, false];

  constructor(private dishService: DishService, public orderDetailsService: OrderDetailsService) { }

  ngOnInit(): void {
    this.getDishes();
    this.getDishesCntAndRating();
    this.findMaxAndMinDishPrice();
    this.getUniqueCuisines();
    this.getUniqueCategories();
  }

  getDishes(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

  getDishesCntAndRating() {
    for (let i of this.dishes) {
      this.dishesCnt[i.name] = 0;
      this.ratings[i.name] = 0;
    }
  }

  getUniqueCuisines() {
    for (let d of this.dishes) {
      this.uniqueCuisines.add(d.cuisine);
    }
  }

  getUniqueCategories() {
    for (let d of this.dishes) {
      for (let c of d.typeAndCategory) {
        this.uniqueCategories.add(c);
      }
    }
  }

  findMaxAndMinDishPrice() {
    for (let i of this.dishes) {
      if (i.price > this.orderDetailsService.maxPrice) {
        this.mostExpensiveDish = i.name;
        this.orderDetailsService.maxPrice = i.price;
      }
      if (i.price < this.orderDetailsService.minPrice) {
        this.cheapestDish = i.name;
        this.orderDetailsService.minPrice = i.price;
      }
    }
    this.orderDetailsService.filterMinPrice = this.orderDetailsService.minPrice;
    this.orderDetailsService.filterMaxPrice = this.orderDetailsService.maxPrice;
  }

  addOrder(dish: Dish) {
    this.orderDetailsService.addOrder(dish);
    this.dishesCnt[dish.name]++;
  }

  removeOrder(dish: Dish) {
    this.orderDetailsService.removeOrder(dish);
    this.dishesCnt[dish.name]--;
  }

  checkIfMinDishCnt(dish: Dish) {
    return this.dishesCnt[dish.name] === 0;
  }

  checkIfMaxDishCnt(dish: Dish) {
    return this.dishesCnt[dish.name] === dish.maxDishesPerDay;
  }

  deleteDish(dish: Dish) {
    this.dishes.splice(this.dishes.indexOf(dish), 1);
    delete this.ratings[dish.name];
    this.orderDetailsService.deleteDish(dish);
  }

  updateDishes(event: Dish) {
    this.dishes.push(event);
    this.dishesCnt[event.name] = 0;
    this.ratings[event.name] = 0;
  }

  updateRating(dish: Dish, rating: number) {
    this.ratings[dish.name] = rating;
  }

  filterCuisine(cuisine: string) {
    if (this.cuisineFilter.has(cuisine)) this.cuisineFilter.delete(cuisine);
    else this.cuisineFilter.add(cuisine);
  }

  filterCategories(category: string) {
    if (this.categoryFilter.has(category)) this.categoryFilter.delete(category);
    else this.categoryFilter.add(category);
  }

  filterRating(star: number) {
    this.ratingFilter[star - 1] = !this.ratingFilter[star - 1];
  }
}
