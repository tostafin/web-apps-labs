import {Component, OnInit} from '@angular/core';
import {OrderDetailsService} from "../Services/order-details.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "../Services/auth.service";
import {DishService} from "../Services/dish.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currOrders: { [key: string]: [number, number, number] } = {};
  currOrdersArr: any[] = [];

  displayedColumns: string[] = ["name", "orders-num", "dish-sum"];

  constructor(public orderDetailsService: OrderDetailsService,
              private dishService: DishService,
              private db: AngularFirestore,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.collectOrders();
    this.orderDetailsService.getDishes();
    this.orderDetailsService.calculateTotalSum();
  }

  collectOrders() {
    this.db.doc(`users/${this.authService.user?.uid}`).valueChanges()
      .subscribe(({uid, username, roles, currOrders, prevOrders, ratedDishes, reviewedDishes}: any) => {
        this.currOrders = currOrders;
        this.currOrdersArr = Object.entries(currOrders);
      })
  }

  orderMessage() {
    this._snackBar.open("Zamówienie zostało złożone!", "Zamknij", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  onOrder() {
    this.dishService.orderDishes(this.currOrders);
    this.orderMessage();
  }
}
