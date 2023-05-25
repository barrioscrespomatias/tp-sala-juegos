import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent {
  letra!: string; //explicitOriginalTarget.innerHTML
  // letraReal!: string;

  recibirItemDeHijo(letraRecibida: string) {
    this.letra = letraRecibida;
  }
}
