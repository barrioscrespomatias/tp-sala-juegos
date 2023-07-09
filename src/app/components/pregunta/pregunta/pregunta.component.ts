import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Trivia } from 'src/app/interfaces/trivia';
import { TriviaPreguntasService } from 'src/app/services/trivia/trivia-preguntas.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {

  constructor(
              private httpService: TriviaPreguntasService,
              private sweetAlert: SweetAlertService,
              ) { }
  suscripcion!: Subscription;
  pregunta!: any;
  habilitarBotones:boolean = true;

  @Input() idPregunta:number = 0;

  ngOnInit() {

  }

  
  ngOnChanges(changes: SimpleChanges) {
    var nuevoIdPregunta = changes['idPregunta'].currentValue;
    if(nuevoIdPregunta > 0){
      this.ObtenerNuevaPregunta(nuevoIdPregunta);
      this.habilitarBotones = true;

    }
  }

  ObtenerNuevaPregunta(idPregunta:number) {
    this.suscripcion = this.httpService
      .Get(idPregunta)
      .subscribe((pregunta) => this.pregunta = pregunta);
  }

  OpcionIncorrecta(){
    this.habilitarBotones = false;
    this.sweetAlert.MensajePerdiste('Buuuuuhhh... será la próxima!')
  }

  OpcionCorrecta(){
    this.habilitarBotones = false;
    this.sweetAlert.MensajeGanaste();
  }

  RemoveSpecialCharacters(text:string) {
    return text.replace(/&[^;]+;/g, '');
  }
}
