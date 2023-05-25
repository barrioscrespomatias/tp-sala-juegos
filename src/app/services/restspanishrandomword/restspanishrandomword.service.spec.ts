import { TestBed } from '@angular/core/testing';

import { RestspanishrandomwordService } from './restspanishrandomword.service';

describe('RestspanishrandomwordService', () => {
  let service: RestspanishrandomwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestspanishrandomwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
