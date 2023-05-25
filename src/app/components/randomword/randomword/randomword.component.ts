import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RandomWord } from 'src/app/interfaces/randomWord';
import { RestspanishrandomwordService } from 'src/app/services/restspanishrandomword/restspanishrandomword.service';

@Component({
  selector: 'app-randomword',
  templateUrl: './randomword.component.html',
  styleUrls: ['./randomword.component.css'],
})
export class RandomwordComponent {
  constructor(private httpService: RestspanishrandomwordService) {}

  //#region Properties
  
  arrayChar!: string[];
  arrayLetrasCorrectas: Array<string> = new Array<string>();
  cantidadErroresMaximos: number = 10;
  form!: FormGroup;
  indicesLetraIngresada: number[] = [];
  ramdomWord!: string;
  suscripcion!: Subscription;
  
  @Output() onEnviarItemHaciaPadre = new EventEmitter<RandomWord>();
  @Input() letraDesdeTeclado:any;

  //#endregion

  //#region Hooks

  ngOnInit() {
    this.form = new FormGroup({
      // usuario : new FormControl('',)
      letra: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    this.suscripcion = this.httpService
      .Get()
      .subscribe((word) => this.GenerarTemplate(word));
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  //#endregion

  //#region Getters

  get letra() {
    return this.form.get('letra');
  }
  
  //#endregion

  //#region Public methods

  enviarItemHaciaPadre(word: RandomWord) {
    this.onEnviarItemHaciaPadre.emit(word);
  }

  GenerarTemplate(word: string) {
    this.ramdomWord = word;    

    //TODO no tiene uso
    //divide la palabra en un array con cada caracter.    
    this.arrayChar = word[0].split('');

    //Setea el array de letras correctas con '_'
    for (let i = 1; i <= word[0].length; i++) {
      this.arrayLetrasCorrectas.push('_');
    }
  }

  SetearLetraAhorcado(letra: string, index: number) {
    this.arrayLetrasCorrectas[index] = this.letra?.value;
  }
  

  ObtenerTodosLosIndices(letra: string, randomWord: string) {
    for (let index = 0; index < randomWord[0].length; index++) {
      if (randomWord[0][index] == letra) {
        this.indicesLetraIngresada.push(index);
      }
    }
  }

  TomarLetraIngresada(){

  }

  //Forma de uso
  //this.ObtenerTodosLosIndices('a', word);
  //#endregion
}
