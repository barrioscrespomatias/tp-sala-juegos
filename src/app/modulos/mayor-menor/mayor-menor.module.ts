import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayorMenorRoutingModule } from './mayor-menor-routing.module';
import { MayorMenorComponent } from './mayor-menor.component';
import { CartaComponent } from '../../components/carta/carta.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MayorMenorComponent,
    CartaComponent,
  ],
  imports: [
    CommonModule,
    MayorMenorRoutingModule,
    HttpClientModule
  ]
})
export class MayorMenorModule { }
