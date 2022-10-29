import { Component, OnInit } from '@angular/core';
import {OrderDetailsService} from "../Services/order-details.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public orderDetailsService: OrderDetailsService) { }

  ngOnInit(): void {
  }

}
