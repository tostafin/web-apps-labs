import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from "../Classes/dish";

@Pipe({
  name: 'price',
  pure: false
})
export class PricePipe implements PipeTransform {

  transform(dishes: Dish[], minPrice: number, maxPrice: number, exchangeRate: number): Dish[] {
    if (!dishes || dishes.length === 0) return [];
    if (minPrice === 1 && maxPrice === Number.MAX_SAFE_INTEGER) return dishes;
    return dishes.filter(d => minPrice <= Math.round(d.price * exchangeRate) && Math.round(d.price * exchangeRate) <= maxPrice);
  }

}
