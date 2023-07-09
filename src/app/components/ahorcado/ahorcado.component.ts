import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  constructor(public firebaseService: FirebaseAuthService) {
    this.checkLoggedIn();
  }

  letra!: string; //explicitOriginalTarget.innerHTML
  public isLogged: boolean = false;


  //#region Metodos
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
    console.log(this.isLogged)
  }

  recibirItemDeHijo(letraRecibida: string) {
    this.letra = letraRecibida;
  }

  //#endregion
}
