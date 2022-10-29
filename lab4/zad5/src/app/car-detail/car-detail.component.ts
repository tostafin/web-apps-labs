import { Component, OnInit } from '@angular/core';
import { CarService } from "../car.service";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {
  brands: string[] = [];
  models: { [key: string]: string[] } = {};
  colors: { [key: string]: string[] } = {};

  brandChosen = false;
  modelChosen = false;
  colorChosen = false;

  pickedBrand?: string;
  pickedModel?: string;
  pickedColor?: string;

  possibleModels?: string[];
  possibleColors?: string[];

  constructor(
    private brandService: CarService,
    private modelService: CarService,
    private colorService: CarService
  ) { }

  getBrands(): void {
    this.brands = this.brandService.getBrands();
  }

  getModels(): void {
    this.models = this.modelService.getModels();
  }

  getColors(): void {
    this.colors = this.colorService.getColors();
  }

  ngOnInit(): void {
    this.getBrands();
    this.getModels();
    this.getColors();
  }

  pickBrand(event: any, brand: string) {
    this.brandChosen = true;
    this.pickedBrand = brand;

    this.modelChosen = this.colorChosen = false;
    this.pickedModel = this.pickedColor = undefined;
    event.currentTarget.classList.add("picked");
    this.possibleModels = this.models[this.pickedBrand];
  }

  pickModel(event: any, model: string) {
    this.modelChosen = true;
    this.pickedModel = model;

    event.currentTarget.classList.add("picked");
    this.possibleColors = this.colors[this.pickedModel];
  }

  pickColor(event: any, color: string) {
    this.colorChosen = true;
    this.pickedColor = color;

    event.currentTarget.classList.add("picked");
  }
}
