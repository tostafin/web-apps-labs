import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCarDetailComponent } from './display-car-detail.component';

describe('DisplayCarDetailComponent', () => {
  let component: DisplayCarDetailComponent;
  let fixture: ComponentFixture<DisplayCarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCarDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
