import {Pipe, PipeTransform} from '@angular/core';
import {Dish} from "../dish";

@Pipe({
  name: 'cuisine',
  pure: false
})
export class CuisinePipe implements PipeTransform {

  transform(dishes: Dish[], args: Set<string>): Dish[] {
    if (!dishes || dishes.length === 0) {
      return [];
    }
    if (!args || args.size === 0) {
      return dishes;
    }
    return dishes.filter(d => args.has(d.cuisine));
  }

}
