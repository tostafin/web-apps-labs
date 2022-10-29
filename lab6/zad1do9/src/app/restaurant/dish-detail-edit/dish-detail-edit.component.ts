import {Component, OnInit} from '@angular/core';
import {Dish} from "../Classes/dish";
import {DishReview} from "../Interfaces/dish-review";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DishService} from "../Services/dish.service";
import {Location} from "@angular/common";
import {MessageService} from "../Services/message.service";
import {OrderDetailsService} from "../Services/order-details.service";
import {RatingService} from "../Services/rating.service";
import {AuthService} from "../Services/auth.service";
import {RoleService} from "../Services/role.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDishDialogComponent} from "../delete-dish-dialog/delete-dish-dialog.component";

@Component({
  selector: 'app-dish-detail-edit',
  templateUrl: './dish-detail-edit.component.html',
  styleUrls: ['./dish-detail-edit.component.css']
})
export class DishDetailEditComponent implements OnInit {
  dish!: Dish;
  reviews: DishReview[] = [];
  currReview!: DishReview;
  currReviewIdx: number = -1;
  editingDish: boolean = false;

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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

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

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDishDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.dishService.deleteDish(this.dish)
        .then(() => {
          this.snackBarMessage("Danie zostało usunięte!");
          this.goBack();
        })
        .catch(e => this.snackBarMessage("Nie udało się usunąć dania: " + e));
    })
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

  editDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return day + '/' + month + '/' + year;
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
      this.snackBarMessage("Dodano recenzję!");
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

  snackBarMessage(message: string) {
    this._snackBar.open(message, "Zamknij", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}
