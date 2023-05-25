import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RandomWord } from 'src/app/interfaces/randomWord';

@Injectable({
  providedIn: 'root'
})
export class RestspanishrandomwordService {

  constructor(private http : HttpClient) { }

  Get(){
    return this.http.get<string>('https://random-word-api.herokuapp.com/word?lang=es');
  }
}
