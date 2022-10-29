import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-car-detail',
  templateUrl: './display-car-detail.component.html',
  styleUrls: ['./display-car-detail.component.css']
})
export class DisplayCarDetailComponent implements OnInit {
  @Input() colorChosen?: boolean;
  @Input() brand?: string;
  @Input() model?: string;
  @Input() color?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
