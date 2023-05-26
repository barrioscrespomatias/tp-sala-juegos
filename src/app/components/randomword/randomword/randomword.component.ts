import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { RandomWord } from 'src/app/interfaces/randomWord';
import { RestspanishrandomwordService } from 'src/app/services/restspanishrandomword/restspanishrandomword.service';

@Component({
  selector: 'app-randomword',
  templateUrl: './randomword.component.html',
  styleUrls: ['./randomword.component.css'],
})
export class RandomwordComponent implements OnChanges {
  constructor(private httpService: RestspanishrandomwordService) {}

  //#region Properties

  arrayChar!: string[];
  arrayLetrasCorrectas: Array<string> = new Array<string>();
  cantidadErroresMaximos: number = 10;
  cantidadActualErrores: number = 0;
  valorActualLetra: string = '';
  // form!: FormGroup;
  indicesLetraIngresada: number[] = [];
  ramdomWord!: string;
  suscripcion!: Subscription;

  //TODO auxiliar mientras no funcione el servicio randomWord
  auxiliarWord: string = 'PRIMERA';

  @Output() onEnviarItemHaciaPadre = new EventEmitter<RandomWord>();
  @Input() letraDesdeTeclado!: string;

  //#endregion

  //#region Hooks

  ngOnInit() {
    // this.form = new FormGroup({
    //   // usuario : new FormControl('',)
    //   letra: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    // });

    // this.suscripcion = this.httpService
    //   .Get()
    //   .subscribe((word) => this.GenerarTemplate(word));

    this.GenerarTemplate(this.auxiliarWord);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.valorActualLetra = changes['letraDesdeTeclado'].currentValue;

    this.ObtenerTodosLosIndices(this.valorActualLetra, this.auxiliarWord);

    console.log(this.indicesLetraIngresada)

    if (this.indicesLetraIngresada.length > 0 && this.indicesLetraIngresada[0] != -1)    
      this.SetearLetraIngresadaEnArrayLetrasCorrectas(this.valorActualLetra, this.indicesLetraIngresada);
    else if (this.indicesLetraIngresada.length == 0)
    this.cantidadActualErrores++;    
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  //#endregion

  //#region Getters

  // get letra() {
  //   return this.form.get('letra');
  // }

  //#endregion

  //#region Public methods

  enviarItemHaciaPadre(word: RandomWord) {
    this.onEnviarItemHaciaPadre.emit(word);
  }

  GenerarTemplate(word: string) {
    this.ramdomWord = word;

    //TODO no tiene uso
    //divide la palabra en un array con cada caracter.
    // this.arrayChar = word[0].split('');

    //TODO mientras NO sea un array quito el word[0]
    this.arrayChar = word.split('');

    //Setea el array de letras correctas con '_'
    // for (let i = 1; i <= word[0].length; i++) {

    //TODO mientras NO sea un array quito el word[0]
    for (let i = 1; i <= word.length; i++) {
      this.arrayLetrasCorrectas.push('_');
    }
  }

  /** ObtenerTodosLosIndices
   *
   * @param letra letra ingresada por el usuario
   * @param randomWord palabra en juego
   * @return Retorna los indices en los que se encuantra la letra dentro de la palabra en juego. Sino encuentra ninguno retorna un array vacio.
   */

  ObtenerTodosLosIndices(letra: string, randomWord: string) {
    this.indicesLetraIngresada = [];
    //TODO mientras NO sea un array quito el word[0]
    // for (let index = 0; index < randomWord[0].length; index++) {
    if (this.LetraNoExisteEnArrayLetrasCorrectas(letra)) {
      for (let index = 0; index < randomWord.length; index++) {
        //TODO mientras NO sea un array quito el word[0]
        if (randomWord[index] == letra) {
          this.indicesLetraIngresada.push(index);
        // } else {
          //No existe ni en arrayletrasCorrectas
          //No existe en randomWord

          //Esto suma errores
          // this.cantidadActualErrores++;
        }
      }
    } 
    else {
      this.indicesLetraIngresada = [-1];
    }
  }

  /** SetearLetraIngresadaEnArrayLetrasCorrectas
   *
   * @param letra letra a setear
   * @param indices indices donde va a setear la letra en arrayLetrasCorrectas
   * @return Si el array de indices que recibe tiene al menos un valor y si el valor es distinto a -1, setea la letra recibida en los indices de arrayLetrasCorrectas
   */
  SetearLetraIngresadaEnArrayLetrasCorrectas(letra: string, indices: number[]) {
    if (indices.length > 0 && indices[0] !== -1) {
      indices.map((index) => (this.arrayLetrasCorrectas[index] = letra));
    }
  }

  LetraNoExisteEnArrayLetrasCorrectas(letra: string) {
    // var letraExistente = false;
    // for (let index = 0; index < this.arrayLetrasCorrectas.length; index++) {
    //   //TODO mientras NO sea un array quito el word[0]
    //   if (this.arrayLetrasCorrectas[index] == letra) {
    //     alert(this.arrayLetrasCorrectas[index])
    //     // this.indicesLetraIngresada.push(index);
    //     letraExistente = true;
    //     break;
    //   }
    // }
    // return letraExistente;
    // console.log(letraExistente)

    return this.arrayLetrasCorrectas.indexOf(letra)! == -1;
  }
  //#endregion
}
