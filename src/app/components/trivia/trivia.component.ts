import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {

  constructor(public firebaseService: FirebaseAuthService) {
    this.checkLoggedIn();
  }

  public isLogged: boolean = false;

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
    console.log(this.isLogged)
  }


  valorPregunta:number = 0;
  ObtenerElemento(valor: number) {    
    this.valorPregunta = valor;
  }
}
