import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';

interface Cell {
  ship: boolean;
  revealed: boolean;
}

@Component({
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.css']
})
export class MiJuegoComponent {

  public isLogged: boolean = false;

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }


  constructor( 
              private firebaseService: FirebaseAuthService,
              private sweetAlert: SweetAlertService,
              public router: Router,                        
            ) {
    this.checkLoggedIn();
    this.initializeBoard();
    this.placeShips(5);
  }

  board: string[][] = [];
  numGuesses = 0;

  initializeBoard() {
    for (let i = 0; i < 5; i++) {
      this.board[i] = [];
      for (let j = 0; j < 5; j++) {
        this.board[i][j] = " "; // Espacio en blanco representa agua
      }
    }
  }

  placeShips(numShips: number) {
    let shipsPlaced = 0;
    while (shipsPlaced < numShips) {
      const row = Math.floor(Math.random() * 5);
      const col = Math.floor(Math.random() * 5);
      if (this.board[row][col] !== "B") {
        this.board[row][col] = "B";
        shipsPlaced++;
      }
    }
  }

  makeGuess(row: number, col: number) {
    if (this.board[row][col] === "B") 
    {
      this.board[row][col] = "X"; // "X" representa un golpe exitoso     
    } 
    else if (this.board[row][col] === "X") 
    {
      this.sweetAlert.MensajeWarning('Ya has encontrado un barco en esa posición!')
    } 
    else 
    {
      this.board[row][col] = "-";
      this.numGuesses++;

      if(this.numGuesses == 20)
      {
        this.sweetAlert.MensajePerdiste('Buuuhh... llegaste al maximo de intentos...');
        this.numGuesses = 0;
        this.ReloadCurrentRoute();
      }
    }

    let shipsLeft = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.board[i][j] === "B") {
          shipsLeft++;
        }
      }
    }

    if (shipsLeft === 0) {
      this.sweetAlert.MensajeGanaste();
      this.ReloadCurrentRoute();
    }
  }

  ReloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
