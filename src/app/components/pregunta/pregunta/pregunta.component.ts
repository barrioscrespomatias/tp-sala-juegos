import { Component } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Trivia } from 'src/app/interfaces/trivia';
import { TriviaPreguntasService } from 'src/app/services/trivia/trivia-preguntas.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {

  constructor(private httpService: TriviaPreguntasService) { }
  suscripcion!: Subscription;
  pregunta!: any;

  ngOnInit() {

    this.ObtenerNuevaPregunta();
  }

  ObtenerNuevaPregunta(accion: string = '') {
    this.suscripcion = this.httpService
      .Get()
      .subscribe((pregunta) => this.pregunta = pregunta);
  }
}
