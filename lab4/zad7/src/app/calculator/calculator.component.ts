import {Component, OnInit} from '@angular/core';
import {BUTTONS} from "../buttons";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  currValue: string = "";
  buttons = BUTTONS;

  constructor() {
  }

  ngOnInit(): void {
  }

  calculate(event: any) {
    let currButton = event.currentTarget.innerHTML;
    if (this.currValue !== "" || (this.currValue === "" && currButton.match(/^[0-9]+$/) != null)) {
      if (currButton === "=") this.currValue = eval(this.currValue);
      else if (currButton === "C") this.currValue = "";
      else if (currButton !== "0" || (currButton === "0" && this.currValue)) this.currValue += currButton;
    }
  }
}
