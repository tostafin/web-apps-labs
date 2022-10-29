import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {DishService} from "../Services/dish.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  addDishForm = new FormGroup({
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
    pictures: new FormControl('', Validators.required),
  });

  constructor(private dishService: DishService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  get name() {
    return this.addDishForm.get('name');
  }

  get cuisine() {
    return this.addDishForm.get('cuisine');
  }

  get typeAndCategory() {
    return this.addDishForm.get('typeAndCategory');
  }

  get ingredients() {
    return this.addDishForm.get('ingredients');
  }

  get maxDishesPerDay() {
    return this.addDishForm.get('maxDishesPerDay');
  }

  get price() {
    return this.addDishForm.get('price');
  }

  get description() {
    return this.addDishForm.get('description');
  }

  get pictures() {
    return this.addDishForm.get('pictures');
  }

  addMessage(message: string) {
    this._snackBar.open(message, "Zamknij", {
      duration: 5000
    });
  }

  onSubmit() {
    this.addDishForm.value["typeAndCategory"] = (this.addDishForm.value["typeAndCategory"].split(", "));
    this.addDishForm.value["ingredients"] = (this.addDishForm.value["ingredients"].split(", "));
    this.addDishForm.value["pictures"] = (this.addDishForm.value["pictures"].split(", "));
    this.dishService.addDish(this.addDishForm.value)
      .then(() => this.addMessage("Danie zostało dodane!"))
      .catch(e => this.addMessage("Nie udało się dodać dania: " + e));
  }
}
