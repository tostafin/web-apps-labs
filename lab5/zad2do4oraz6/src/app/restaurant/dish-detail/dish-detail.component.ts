import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {DishService} from "../Services/dish.service";
import {Dish} from "../dish";
import {DishReview} from "../dish-review";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MessageService} from "../Services/message.service";
import {OrderDetailsService} from "../Services/order-details.service";
import {RatingService} from "../Services/rating.service";

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
  editingDish: boolean = false;

  reviewForm = new FormGroup({
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
    public ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.getDishes();
    this.orderDetailsService.getDishes();
    this.getDish();
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

  deleteDish() {
    this.dishService.deleteDish(this.dish);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  editDish() {
    this.editingDish = !this.editingDish;
  }

  onSubmit() {
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
      const newReview: DishReview = Object.create(this.reviewForm.value);
      this.reviews.push(newReview);
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
