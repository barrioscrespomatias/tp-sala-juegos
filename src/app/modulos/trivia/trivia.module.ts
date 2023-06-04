import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviaRoutingModule } from './trivia-routing.module';
import { TriviaComponent } from './trivia.component';
import { RoulettewheelComponent } from '../../components/roulettewheel/roulettewheel/roulettewheel.component';
import { PreguntaComponent } from '../../components/pregunta/pregunta/pregunta.component';


@NgModule({
  declarations: [
    TriviaComponent,
    RoulettewheelComponent,
    PreguntaComponent
  ],
  imports: [
    CommonModule,
    TriviaRoutingModule
  ]
})
export class TriviaModule { }
