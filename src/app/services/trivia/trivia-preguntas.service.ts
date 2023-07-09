import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trivia } from 'src/app/interfaces/trivia';

@Injectable({
  providedIn: 'root'
})
export class TriviaPreguntasService {

  constructor(private http : HttpClient) { }

  Get(catetgory: number){
    return this.http.get<Trivia>(`https://opentdb.com/api.php?amount=1&category=${catetgory}&difficulty=easy&type=multiple`);
  }
}
