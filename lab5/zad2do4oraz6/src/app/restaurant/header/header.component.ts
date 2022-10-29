import {Component, OnInit} from '@angular/core';
import {OrderDetailsService} from "../Services/order-details.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public orderDetailsService: OrderDetailsService) {
  }

  ngOnInit(): void {
  }

}
