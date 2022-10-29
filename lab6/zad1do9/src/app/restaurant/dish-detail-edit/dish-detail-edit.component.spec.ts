import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDetailEditComponent } from './dish-detail-edit.component';

describe('DishDetailEditComponent', () => {
  let component: DishDetailEditComponent;
  let fixture: ComponentFixture<DishDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishDetailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
