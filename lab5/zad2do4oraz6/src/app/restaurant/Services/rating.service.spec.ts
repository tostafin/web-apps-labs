import { TestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';

describe('ReviewService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
