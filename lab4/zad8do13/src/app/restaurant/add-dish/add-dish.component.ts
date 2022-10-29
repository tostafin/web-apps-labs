import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Dish } from "../dish";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  @Output() newDishEvent = new EventEmitter<Dish>();
  dishForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([A-ZÀ-Ž ][a-zà-ž ]+)$/)
    ]),
    cuisine: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([a-zà-ž ]+)$/)
    ]),
    typeAndCategory: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([a-zà-ž ]*)$|^(([a-zà-ž ]*, )+)([a-zà-ž ]+)$/)
    ]),
    ingredients: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([a-zà-ž ]*, ){2,})([a-zà-ž ]+)$/)
    ]),
    maxDishesPerDay: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ]),
    price: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([A-ZÀ-Ž0-9])|([A-ZÀ-Ž0-9][a-zà-ž0-9]+))+((?:\s[A-ZÀ-Ža-zà-ž0-9]+)+)[.!]$/)
    ]),
    pictures: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([A-ZÀ-Ža-zà-ž0-9.\/:_-]*, )+)([A-ZÀ-Ža-zà-ž0-9.\/:_-]+)$/)
    ]),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  get name() {
    return this.dishForm.get('name');
  }

  get cuisine() {
    return this.dishForm.get('cuisine');
  }

  get typeAndCategory() {
    return this.dishForm.get('typeAndCategory');
  }

  get ingredients() {
    return this.dishForm.get('ingredients');
  }

  get maxDishesPerDay() {
    return this.dishForm.get('maxDishesPerDay');
  }

  get price() {
    return this.dishForm.get('price');
  }

  get description() {
    return this.dishForm.get('description');
  }

  get pictures() {
    return this.dishForm.get('pictures');
  }

  onSubmit() {
    this.dishForm.value["typeAndCategory"] = (this.dishForm.value["typeAndCategory"].split(", "));
    this.dishForm.value["ingredients"] = (this.dishForm.value["ingredients"].split(", "));
    this.dishForm.value["pictures"] = (this.dishForm.value["pictures"].split(", "));
    const newDish: Dish = Object.create(this.dishForm.value);
    this.newDishEvent.emit(newDish);
  }
}
