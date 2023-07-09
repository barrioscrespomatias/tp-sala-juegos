import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Carta } from 'src/app/clases/carta/carta';
import { DeckID } from 'src/app/interfaces/deckId';
import { DrawCard } from 'src/app/interfaces/drawCard';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';
import { RestdeckofcardsService } from 'src/app/services/restdeckofcards/restdeckofcards.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
const CONST_MAYOR = 'MAYOR';
const CONST_MENOR = 'MENOR';
const CONST_IGUAL = 'IGUAL'

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
})
export class CartaComponent {
  constructor(private httpService: RestdeckofcardsService,
              private sweetAlert: SweetAlertService,
              private firebaseService: FirebaseAuthService,
              ) {this.checkLoggedIn();}

  public isLogged: boolean = false;

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
    console.log(this.isLogged)
  }

  suscripcion!: Subscription;
  deck!: any;
  card!: any;
  cartas: Carta[] = [];
  carta: Carta = new Carta();

  valorActual: number = 0;
  valorAnterior: number = 0;
  anteriorMayorActual: boolean = false;
  resultado: string = '';
  puntaje : number = 0;

  @Output() onEnviarItemHaciaPadre = new EventEmitter<DrawCard>();

  ngOnInit() {
    this.ObtenerNuevaCarta();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes['letraDesdeTeclado'].currentValue;
    console.log(changes)
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  enviarItemHaciaPadre(card: DrawCard) {
    this.onEnviarItemHaciaPadre.emit(card);
  }

  EstablecerValores(drawCard: DrawCard, accion: string) {
    this.card = drawCard;
    var stringValue = drawCard?.cards[0]?.value;

    switch (stringValue) {
      case 'KING':
        stringValue = '13';
        break;
      case 'QUEEN':
        stringValue = '12';
        break;
      case 'JACK':
        stringValue = '11';
        break;
      case 'ACE':
        stringValue = '1';
        break;
    }
    
    var valor: number = Number(stringValue);
    var imagen: string = drawCard?.cards[0]?.image;

    //TODO Revisar como hacer para poder utilizar el valor de la suscripcion = .subscribe((card) => this.EstablecerValores(card));
    //En el resto del codigo y no tener que generar datos en memoria.

    this.carta.valor = valor;
    this.carta.imagen = imagen;

    //Traigo localStoraga
    // var valoresFromLs = localStorage.getItem('valores');
    var valoresEnMemoria = this.TraerValoresLs();

    
    
    if(valoresEnMemoria != undefined){
      if (valoresEnMemoria.length == 3)
      //Mantengo el array en 2 elementos.
      valoresEnMemoria.shift();

      valoresEnMemoria.push(this.carta);
    }
    //Agrego nuevo valor
    else{
      valoresEnMemoria = new Array<Carta>;
      valoresEnMemoria.push(this.carta);
    }

    //Funcionalidad mayor o menor.
    if(valoresEnMemoria[1] == undefined){
      valoresEnMemoria[1].valor = 0
    }
    else
      this.valorAnterior = valoresEnMemoria[1].valor;

    this.valorActual = valor;
    this.resultado = this.valorActual > this.valorAnterior ?  CONST_MAYOR : this.valorActual == this.valorAnterior ? CONST_IGUAL : CONST_MENOR;


    if(accion == CONST_MAYOR && this.resultado == CONST_MAYOR){
      this.puntaje++; 
      if(this.puntaje == 5){
        this.sweetAlert.MensajeGanaste(); 
        this.puntaje = 0;
      }
    }
    else if(accion == CONST_MENOR && this.resultado == CONST_MENOR){
      this.puntaje++; 
      if(this.puntaje == 5){
        this.sweetAlert.MensajeGanaste(); 
        this.puntaje = 0;
      }
    }
    else if((accion == CONST_MENOR && this.resultado != CONST_MENOR || accion == CONST_MAYOR && this.resultado != CONST_MAYOR) && this.resultado != CONST_IGUAL){
      this.sweetAlert.MensajePerdiste('La suerte no te acompañó. Tu puntaje fue: ' + this.puntaje)
      this.puntaje = 0
    }

    //utilizo localstorage para comparar valores.
    localStorage.setItem('valores', JSON.stringify(valoresEnMemoria));    
  }

  ObtenerNuevaCarta(accion : string = ''){
    this.suscripcion = this.httpService
      .GetDeckId()
      .pipe(
        switchMap((deck) => {
          this.deck = deck;
          return this.httpService.DrawCard(this.deck.deck_id);
        })
      )
      .subscribe((card) => this.EstablecerValores(card, accion));
  }

  Jugar(accion:string){
    localStorage.setItem('accion', JSON.stringify(accion));
    this.ObtenerNuevaCarta(accion);    
    
  }

  TraerValoresLs(){
    //Traigo localStoraga
    var valoresFromLs = localStorage.getItem('valores');
    var valoresEnMemoria;

    if (valoresFromLs !== null)
        valoresEnMemoria = JSON.parse(valoresFromLs);
    return valoresEnMemoria
  }
}
