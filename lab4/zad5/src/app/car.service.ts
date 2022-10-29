import { Injectable } from '@angular/core';
import { BRANDS, MODELS, COLORS } from "./cars";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getBrands(): string[] {
    return BRANDS;
  }

  getModels(): { [key: string]: string[] } {
    return MODELS;
  }

  getColors(): { [key: string]: string[] } {
    return COLORS;
  }
}
