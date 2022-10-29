import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from "../dish";

@Pipe({
  name: 'rating',
  pure: false
})
export class RatingPipe implements PipeTransform {

  transform(dishes: Dish[], ratingFilter: boolean[], rating: { [key: string]: number }): Dish[] {
    if (!dishes || dishes.length === 0) {
      return [];
    }
    if (ratingFilter.every(r => !r) || (rating && Object.keys(rating).length === 0 && Object.getPrototypeOf(rating))) {
      return dishes;
    }
    return dishes.filter(d => {
      if (!(d.name in rating)) return false;
      const numOfStart = rating[d.name];
      return ratingFilter[numOfStart - 1];
    })
  }
}
