import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trivia } from 'src/app/interfaces/trivia';

@Injectable({
  providedIn: 'root'
})
export class TriviaPreguntasService {

  constructor(private http : HttpClient) { }

  Get(){
    return this.http.get<Trivia>('https://the-trivia-api.com/api/questions');
  }
}
