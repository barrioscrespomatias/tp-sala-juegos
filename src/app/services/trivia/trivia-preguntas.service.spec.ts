import { TestBed } from '@angular/core/testing';

import { TriviaPreguntasService } from './trivia-preguntas.service';

describe('TriviaPreguntasService', () => {
  let service: TriviaPreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaPreguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
