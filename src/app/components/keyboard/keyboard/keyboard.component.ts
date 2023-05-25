import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent {
  @Output() onEnviarItemHaciaPadre = new EventEmitter<string>();

  enviarItemHaciaPadre(letra: string) {
    this.onEnviarItemHaciaPadre.emit(letra);
  }
}
