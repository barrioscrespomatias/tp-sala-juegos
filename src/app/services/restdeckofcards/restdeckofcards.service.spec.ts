import { TestBed } from '@angular/core/testing';

import { RestdeckofcardsService } from './restdeckofcards.service';

describe('RestdeckofcardsService', () => {
  let service: RestdeckofcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestdeckofcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
