import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../Classes/dish";

@Pipe({
  name: 'category',
  pure: false
})
export class CategoryPipe implements PipeTransform {

  transform(dishes: Dish[], args: Set<string>): Dish[] {
    if (!dishes || dishes.length === 0) {
      return [];
    }
    if (!args || args.size === 0) {
      return dishes;
    }
    return dishes.filter(d => {
      let found: boolean = false;
      for (let c of args) {
        if (d.typeAndCategory.includes(c)) {
          found = true;
          break;
        }
      }
      return found;
    });
  }
}
