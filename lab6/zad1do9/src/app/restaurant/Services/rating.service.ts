import { Injectable } from '@angular/core';
import {Dish} from "../Classes/dish";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  ratings: { [key: string]: number } = {};
  meanRatings: { [key: string]: number } = {};
  allRatings: { [key: string]: number[] } = {}
  ratingFilter: boolean[] = [false, false, false, false, false];
  numOfRatings: number = 0;

  constructor(private authService: AuthService) { }

  updateRating(dish: Dish, rating: number) {
    if (!(dish.name in this.ratings)) {
      this.ratings[dish.name] = rating;
      this.meanRatings[dish.name] = rating;
      this.allRatings[dish.name] = [rating];
      this.numOfRatings++;
    }
    else {
      this.allRatings[dish.name].push(rating);
      this.ratings[dish.name] = rating;
      this.meanRatings[dish.name] = Math.round
      (this.allRatings[dish.name].reduce((a, b) => a + b) / this.allRatings[dish.name].length);
    }
    this.authService.addUserRating(dish.name);
  }

  filterRating(star: number) {
    this.ratingFilter[star - 1] = !this.ratingFilter[star - 1];
  }
}
