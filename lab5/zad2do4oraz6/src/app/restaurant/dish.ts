export class Dish {
  id?: string;
  name: string;
  cuisine: string;
  typeAndCategory: string[];
  ingredients: string[];
  maxDishesPerDay: number;
  price: number;
  description: string;
  pictures: string[];

  constructor(name: string, cuisine: string, typeAndCategory: string[], ingredients: string[], maxDishesPerDay: number, price: number, description: string, pictures: string[]) {
    this.name = name;
    this.cuisine = cuisine;
    this.typeAndCategory = typeAndCategory;
    this.ingredients = ingredients;
    this.maxDishesPerDay = maxDishesPerDay;
    this.price = price;
    this.description = description;
    this.pictures = pictures;
  }
}
