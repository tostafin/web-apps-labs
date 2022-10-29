import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  childCnt: number = 0;
  @Output() childCntEvent = new EventEmitter<number>();
  @Output() incrementButtonEvent = new EventEmitter<boolean>();

  @Input() buttonDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  incrementCntOutput() {
    this.childCntEvent.emit(++this.childCnt);
  }

  resetCntOutput() {
    this.childCnt = 0;
    this.childCntEvent.emit(this.childCnt);

    this.buttonDisabled = false;
    this.incrementButtonEvent.emit(this.buttonDisabled);
  }

}
