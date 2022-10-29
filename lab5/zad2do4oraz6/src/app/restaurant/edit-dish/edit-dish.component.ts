import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Dish} from "../dish";
import {DishService} from "../Services/dish.service";

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  @Input() dish!: Dish;
  editMessage: string = "";

  editDishForm = new FormGroup({
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

  constructor(private dishService: DishService) { }

  get name() {
    return this.editDishForm.get('name');
  }

  get cuisine() {
    return this.editDishForm.get('cuisine');
  }

  get typeAndCategory() {
    return this.editDishForm.get('typeAndCategory');
  }

  get ingredients() {
    return this.editDishForm.get('ingredients');
  }

  get maxDishesPerDay() {
    return this.editDishForm.get('maxDishesPerDay');
  }

  get price() {
    return this.editDishForm.get('price');
  }

  get description() {
    return this.editDishForm.get('description');
  }

  get pictures() {
    return this.editDishForm.get('pictures');
  }

  ngOnInit(): void {
    this.editDishForm.patchValue({
      name: this.dish.name,
      cuisine: this.dish.cuisine,
      typeAndCategory: this.dish.typeAndCategory.join(", "),
      ingredients: this.dish.ingredients.join(", "),
      maxDishesPerDay: this.dish.maxDishesPerDay,
      price: this.dish.price,
      description: this.dish.description,
      pictures: this.dish.pictures.join(", ")
      });
  }

  onSubmit() {
    this.editDishForm.value["typeAndCategory"] = (this.editDishForm.value["typeAndCategory"].split(", "));
    this.editDishForm.value["ingredients"] = (this.editDishForm.value["ingredients"].split(", "));
    this.editDishForm.value["pictures"] = (this.editDishForm.value["pictures"].split(", "));
    this.editDishForm.value["id"] = this.dish.id;
    this.dishService.updateDish(this.editDishForm.value);
    this.editMessage = "Danie zostało zaktualizowane!";
  }
}
