import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeckID } from 'src/app/interfaces/deckId';
import { DrawCard } from 'src/app/interfaces/drawCard';

@Injectable({
  providedIn: 'root'
})
export class RestdeckofcardsService {

  constructor(private http : HttpClient) { }

  GetDeckId(){
    return this.http.get<DeckID>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  }

  DrawCard(deck_id:string){    
    return this.http.get<DrawCard>(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
  }
}
