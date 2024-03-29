import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dishName: string = this.route.snapshot.paramMap.get('name')!;
    console.log(dishName);
  }

}
