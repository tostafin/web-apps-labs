import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  parentCnt: number = 0;
  disableIncrementButton: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateCnt(event: number) {
    this.parentCnt = event;
    if (this.parentCnt >= 10) this.disableIncrementButton = true;
  }
}
