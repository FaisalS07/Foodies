import { TestBed } from '@angular/core/testing';

import { FoodstoreService } from './foodstore.service';

describe('FoodstoreService', () => {
  let service: FoodstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
