import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesEditComponent } from './dishes-edit.component';

describe('DishesEditComponent', () => {
  let component: DishesEditComponent;
  let fixture: ComponentFixture<DishesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
