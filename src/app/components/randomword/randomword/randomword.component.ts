import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription, map } from 'rxjs';
import { RandomWord } from 'src/app/interfaces/randomWord';
import { RestspanishrandomwordService } from 'src/app/services/restspanishrandomword/restspanishrandomword.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-randomword',
  templateUrl: './randomword.component.html',
  styleUrls: ['./randomword.component.css'],
})
export class RandomwordComponent implements OnChanges {
  constructor(private httpService: RestspanishrandomwordService,
              private sweetAlert: SweetAlertService,
              public router: Router,  
              ) {}

  //#region Properties

  arrayChar!: string[];
  arrayLetrasCorrectas: Array<string> = new Array<string>();
  cantidadErroresMaximos: number = 10;
  cantidadActualErrores: number = -1;
  valorActualLetra: string = '';
  indicesLetraIngresada: number[] = [];
  ramdomWord!: string;
  suscripcion!: Subscription;
  @Output() onEnviarItemHaciaPadre = new EventEmitter<RandomWord>();
  @Input() letraDesdeTeclado!: string;
  otraPalabra:string ='';

  usuariosSubscription:any;

  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.suscripcion = this.httpService
      .Get()
      .subscribe((word) => this.GenerarTemplate(word));


      this.usuariosSubscription = (
        await this.httpService.Get()
      ).subscribe((palabra) => {
        this.otraPalabra = palabra
      }); 

      // this.otraPalabra =  await this.httpService
      // .Get()

      // await this.usuarioService.getProfesional(this.email).then((usuario: any) => {
      //   this.usuario = usuario;        
      // });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.valorActualLetra = changes['letraDesdeTeclado'].currentValue;

    if(this.ramdomWord){
      this.ObtenerTodosLosIndices(this.valorActualLetra, this.ramdomWord);
    }

    if (this.indicesLetraIngresada.length > 0 && this.indicesLetraIngresada[0] != -1)    
      this.SetearLetraIngresadaEnArrayLetrasCorrectas(this.valorActualLetra, this.indicesLetraIngresada);
    else if (this.indicesLetraIngresada.length == 0)
      this.cantidadActualErrores++;    

    // if(this.arrayLetrasCorrectas)
    
    if (!this.arrayLetrasCorrectas.includes("_") && this.arrayLetrasCorrectas.length > 0){
      // this.sweetAlert.MensajeGanaste('Muy bien jugado!! La palabra era: '+ this.ramdomWord.toUpperCase())
      this.sweetAlert.MensajeGanaste();
      this.ReloadCurrentRoute();
    }
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
    this.usuariosSubscription.unsubscribe();
  }

  //#endregion

  //#region Public methods

  enviarItemHaciaPadre(word: RandomWord) {
    this.onEnviarItemHaciaPadre.emit(word);
  }

  GenerarTemplate(word: string) {
    if(word.length > 0){
      
    // console.log('palabra : '+ word)
    
    this.ramdomWord = word;

    // this.ramdomWord[0][0] = 'a';
    
    // console.log('primera letra: ' + word[0][0])

    var firstCharacter = word[0][0];

    if (firstCharacter == firstCharacter.toUpperCase() || word[0].includes(' ') || word[0].includes('.' )) 
    {
      this.ReloadCurrentRoute();
    }

    console.log(word[0])
    
    


    // let randomWordArray: string[] = word[0].split('');
    
    // randomWordArray[0] = this.ramdomWord[0][0].toLocaleLowerCase();
    
    // this.ramdomWord = randomWordArray.join('');

    // console.log('formateada primera letra ' + this.ramdomWord)




    this.arrayChar = word[0].toLocaleLowerCase().split('');

    //Setea el array de letras correctas con '_'
      for (let i = 1; i <= word[0].length; i++) {
        this.arrayLetrasCorrectas.push('_');
      }
    }    
  }


  
  
  ReloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  
  
  
  

  /** ObtenerTodosLosIndices
   *
   * @param letra letra ingresada por el usuario
   * @param randomWord palabra en juego
   * @return Retorna los indices en los que se encuantra la letra dentro de la palabra en juego. Sino encuentra ninguno retorna un array vacio.
   */

  ObtenerTodosLosIndices(letra: string, randomWord: string) {
    this.indicesLetraIngresada = [];    
    
    if (!this.LetraExisteEnArrayLetrasCorrectas(letra)) {
      for (let index = 0; index < randomWord[0].length; index++) {
        var letraRandomWordSinAcento = this.QuitarAcento(randomWord[0][index]);  

        if (letraRandomWordSinAcento == letra.toLowerCase()) {
          this.indicesLetraIngresada.push(index);
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

  LetraExisteEnArrayLetrasCorrectas(letra: string) {
    var letraExistente = false;
    for (let index = 0; index < this.arrayLetrasCorrectas.length; index++) {
      if (this.arrayLetrasCorrectas[index].toLocaleLowerCase() == letra) {
        letraExistente = true;
        break;
      }
    }
    return letraExistente;
  }

  QuitarAcento(letra:string){
    var letraSinAcento = letra;
    switch(letra)
    {
      case 'á':
        letraSinAcento = 'a';
        break;
      case 'é':
        letraSinAcento = 'e';
        break;
      case 'í':
        letraSinAcento = 'i';
        break;
      case 'ó':
        letraSinAcento = 'o';
        break;
      case 'ú':
        letraSinAcento = 'u';
        break;    
    }
    return letraSinAcento;
  }
  //#endregion
}
