import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {DishService} from "../Services/dish.service";
import {Dish} from "../Classes/dish";
import {DishReview} from "../Interfaces/dish-review";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MessageService} from "../Services/message.service";
import {OrderDetailsService} from "../Services/order-details.service";
import {RatingService} from "../Services/rating.service";
import {AuthService} from "../Services/auth.service";
import {RoleService} from "../Services/role.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish!: Dish;
  reviews: DishReview[] = [];
  currReview!: DishReview;
  currReviewIdx: number = -1;

  reviewForm = new FormGroup({
    username: new FormControl(''),
    nick: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(51),
      Validators.maxLength(499)
    ]),
    date: new FormControl('')
  });

  get nick() {
    return this.reviewForm.get('nick');
  }

  get name() {
    return this.reviewForm.get('name');
  }

  get description() {
    return this.reviewForm.get('description');
  }

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location,
    private messageService: MessageService,
    public orderDetailsService: OrderDetailsService,
    public ratingService: RatingService,
    public authService: AuthService,
    public roleService: RoleService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getDishes();
    this.orderDetailsService.getDishes();
    this.getDish();
    this.roleService.getAllUsers();
    this.authService.getUserRatedDishes();
    this.authService.getUserReviewedDishes();
    this.authService.getPrevOrders();
  }

  getDishes(): void {
    this.dishService.getDishes().subscribe(() => {
      this.getDish()
    });
  }

  getDish(): void {
    const dishName: string = this.route.snapshot.paramMap.get('name')!;
    this.dishService.getDish(dishName)
      .subscribe(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

  isRated() {
    return this
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  editDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return day + '/' + month + '/' + year;
  }

  addMessage(message: string) {
    this._snackBar.open(message, "Zamknij", {
      duration: 5000
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.messageService.clear();
    let validForm = true;
    if (this.nick?.errors?.['required']) {
      this.messageService.add("Nick jest wymagany.");
      validForm = false;
    }
    if (this.name?.errors?.['required']) {
      this.messageService.add("Nazwa jest wymagana.");
      validForm = false;
    }
    if (this.description?.errors?.['required']) {
      this.messageService.add("Opis jest wymagany.");
      validForm = false;
    }
    if (this.description?.errors?.['minlength']) {
      this.messageService.add("Opis musi zawierać więcej niż 50 znaków.");
      validForm = false;
    }
    if (this.description?.errors?.['maxlength']) {
      this.messageService.add("Opis musi zawierać mniej niż 500 znaków.");
      validForm = false;
    }
    if (validForm) {
      this.reviewForm.patchValue({username: this.authService.username});
      console.log(this.reviewForm.value.username);
      if (this.reviewForm.value.date !== "" && this.reviewForm.value.date !== null) {
        this.reviewForm.value.date = this.editDate(this.reviewForm.value.date);
      }
      const newReview: DishReview = Object.create(this.reviewForm.value);
      this.reviews.push(newReview);
      this.addMessage("Dodano recenzję!");
      this.authService.addUserReview(this.dish.name);
      formDirective.resetForm();
      this.reviewForm.reset();
      if (this.currReviewIdx === -1) {
        this.currReviewIdx = 0;
        this.currReview = this.reviews[this.currReviewIdx];
      }
    }
  }

  leftArrow() {
    this.currReviewIdx = Math.abs(this.currReviewIdx + 1) % this.reviews.length;
    this.changeWorker();
  }

  rightArrow() {
    this.currReviewIdx = Math.abs(this.currReviewIdx - 1 + this.reviews.length) % this.reviews.length;
    this.changeWorker();
  }

  randomReview() {
    const reviewIdx = this.currReviewIdx;
    do this.currReviewIdx = this.getRandomInt(0, this.reviews.length)
    while (this.currReviewIdx === reviewIdx);
    this.changeWorker();
  }

  changeWorker() {
    this.currReview = this.reviews[this.currReviewIdx % this.reviews.length];
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);  // max is exclusive!
  }
}
