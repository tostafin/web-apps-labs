import {Component, OnInit} from '@angular/core';
import {Dish} from "../Classes/dish";
import {OrderDetailsService} from "../Services/order-details.service";
import {RatingService} from "../Services/rating.service";
import {DishService} from "../Services/dish.service";
import {CuisinePipe} from "../Pipes/cuisine.pipe";
import {PricePipe} from "../Pipes/price.pipe";
import {RatingPipe} from "../Pipes/rating.pipe";
import {CategoryPipe} from "../Pipes/category.pipe";
import {AuthService} from "../Services/auth.service";
import {RoleService} from "../Services/role.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  dishesFiltered: Dish[] = [];
  dishesFilteredComp: Dish[] = [];
  mostExpensiveDish: string = "";
  cheapestDish: string = "";

  uniqueCuisines: Set<string> = new Set();
  cuisineFilter: Set<string> = new Set();

  uniqueCategories: Set<string> = new Set();
  categoryFilter: Set<string> = new Set();

  numOfDishes: number = 0;
  dishesNumArr: number[] = [];
  pages: number[] = [1];
  currPage: number = 1;

  showFilters: boolean = false;

  constructor(
    public dishService: DishService,
    public orderDetailsService: OrderDetailsService,
    public ratingService: RatingService,
    public authService: AuthService,
    public roleService: RoleService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cuisinePipe: CuisinePipe,
    private pricePipe: PricePipe,
    private ratingPipe: RatingPipe,
    private categoryPipe: CategoryPipe
  ) {
  }

  ngOnInit() {
    this.getDishes();

  }

  getDishes() {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      this.dishesFiltered = dishes;
      this.dishesFilteredComp = dishes;
      this.prepareDishes();
    });
  }

  prepareDishes() {
    this.orderDetailsService.getDishes();
    this.findMaxAndMinDishPrice();
    this.getUniqueCuisines();
    this.getUniqueCategories();
    this.numOfDishes = this.dishes.length;
    this.dishesNumArr = Array(this.numOfDishes).fill(1).map((x, i) => i + 1);
  }

  getDishUrl(dishName: string) {
    return dishName.replace(/\s+/g, '-').toLowerCase();
  }

  getUniqueCuisines() {
    this.uniqueCuisines = new Set();
    for (let d of this.dishes) {
      this.uniqueCuisines.add(d.cuisine);
    }
  }

  getUniqueCategories() {
    this.uniqueCategories = new Set();
    for (let d of this.dishes) {
      for (let c of d.typeAndCategory) {
        this.uniqueCategories.add(c);
      }
    }
  }

  findMaxAndMinDishPrice() {
    this.orderDetailsService.maxPrice = -1;
    this.orderDetailsService.minPrice = Number.MAX_SAFE_INTEGER;
    for (let i of this.dishes) {
      if (i.price >= this.orderDetailsService.maxPrice) {
        this.mostExpensiveDish = i.name;
        this.orderDetailsService.maxPrice = i.price;
      }
      if (i.price <= this.orderDetailsService.minPrice) {
        this.cheapestDish = i.name;
        this.orderDetailsService.minPrice = i.price;
      }
    }
    this.orderDetailsService.filterMinPrice = this.orderDetailsService.minPrice;
    this.orderDetailsService.filterMaxPrice = this.orderDetailsService.maxPrice;
  }

  filterCuisine(cuisine: string) {
    if (this.cuisineFilter.has(cuisine)) this.cuisineFilter.delete(cuisine);
    else this.cuisineFilter.add(cuisine);
    this.filterDishes();
  }

  filterRating(star: number) {
    this.ratingService.filterRating(star);
    this.filterDishes();
  }

  filterCategories(category: string) {
    if (this.categoryFilter.has(category)) this.categoryFilter.delete(category);
    else this.categoryFilter.add(category);
    this.filterDishes();
  }

  filterDishes() {
    this.dishesFiltered = this.cuisinePipe.transform(
      this.pricePipe.transform(
        this.ratingPipe.transform(
          this.categoryPipe.transform(
            this.dishes, this.categoryFilter
          )
          , this.ratingService.ratingFilter, this.ratingService.meanRatings)
        , this.orderDetailsService.filterMinPrice, this.orderDetailsService.filterMaxPrice, this.orderDetailsService.exchangeRate)
      , this.cuisineFilter);

    this.dishesNumArr = Array(this.dishesFiltered.length).fill(1).map((x, i) => i + 1);
    this.onNumOfPages(this.dishesFiltered.length);
  }

  paginate(dishes: Dish[]) {
    const idx = this.numOfDishes * (this.currPage - 1);
    return dishes.slice(idx, idx + this.numOfDishes);
  }

  updatePagination() {
    const numOfPages = Math.ceil(this.dishesFiltered.length / this.numOfDishes);
    if (!isNaN(this.currPage)) this.currPage = Math.min(this.currPage, numOfPages);
    else this.currPage = numOfPages;
    this.dishesFilteredComp = this.paginate(this.dishesFiltered);
    if (this.numOfDishes !== 0) this.pages = Array(numOfPages).fill(1).map((x, i) => i + 1);
    else this.pages = [];
  }

  changeCurrPage(page: any) {
    if (!(typeof page === "number")) this.currPage = page.value;
    else this.currPage = page;
    this.dishesFilteredComp = this.paginate(this.dishesFiltered);
  }

  onNumOfPages(dishesNum: any) {
    if (!(typeof dishesNum === "number")) this.numOfDishes = dishesNum.value;
    else this.numOfDishes = dishesNum;
    this.updatePagination();
  }

  changeFiltersVisibility() {
    this.showFilters = !this.showFilters;
  }

  dishDetailMessage() {
    this._snackBar.open("Zaloguj się, aby zobaczyć szczegóły dania.", "Zamknij", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  goToDishDetails(dishUrl: string) {
    if (this.roleService.canViewDishDetails()) this.router.navigate(["dishes/" + dishUrl]);
    else this.dishDetailMessage();
  }
}
