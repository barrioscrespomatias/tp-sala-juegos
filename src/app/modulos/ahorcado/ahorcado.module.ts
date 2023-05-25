import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { AhorcadoComponent } from './ahorcado.component';
import { RandomwordComponent } from '../../components/randomword/randomword/randomword.component';
import { KeyboardComponent } from '../../components/keyboard/keyboard/keyboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapturarLetraTecladoDirective } from 'src/app/directives/capturar-letra-teclado.directive';

@NgModule({
  declarations: [AhorcadoComponent, RandomwordComponent, KeyboardComponent, CapturarLetraTecladoDirective],
  imports: [
    CommonModule,
    AhorcadoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AhorcadoModule {}
