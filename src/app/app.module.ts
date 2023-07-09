import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuienSoyComponent } from './components/informativo/quien-soy/quien-soy.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { NavComponent } from './components/nav/nav.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FirebaseAuthService } from './services/angularfire/firebase-auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { RandomwordComponent } from './components/randomword/randomword/randomword.component';
import { KeyboardComponent } from './components/keyboard/keyboard/keyboard.component';
import { CapturarLetraTecladoDirective } from 'src/app/directives/capturar-letra-teclado.directive';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { CartaComponent } from './components/carta/carta.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { RoulettewheelComponent } from './components/roulettewheel/roulettewheel/roulettewheel.component';
import { PreguntaComponent } from './components/pregunta/pregunta/pregunta.component';
import { RandomOrderDirective } from 'src/app/directive/random-order.directive';
import { MiJuegoComponent } from './components/mi-juego/mi-juego.component';
import { RemoverCaracteresEspecialesPipe } from './pipes/remover-caracteres-especiales.pipe';


@NgModule({
  declarations: [
    AppComponent,
    QuienSoyComponent,
    JumbotronComponent,
    NavComponent,
    HomeComponent,
    ChatComponent,
    KeyboardComponent,
    RandomwordComponent,
    CapturarLetraTecladoDirective,
    AhorcadoComponent,
    CartaComponent,
    TriviaComponent,
    RoulettewheelComponent,
    PreguntaComponent,
    RandomOrderDirective,
    MiJuegoComponent,
    RemoverCaracteresEspecialesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FirebaseAuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
