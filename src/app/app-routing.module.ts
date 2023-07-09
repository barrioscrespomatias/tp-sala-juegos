import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
// route guard
import { AuthGuard } from './components/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { CartaComponent } from './components/carta/carta.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { MiJuegoComponent } from './components/mi-juego/mi-juego.component';
const routes: Routes = [
  // lazy loading
  {
    path: '',
    loadChildren: () =>
      import('./modulos/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modulos/registro/registro.module').then(
        (m) => m.RegistroModule
      ),
  },

  //normal loading

  {
    path: 'quien-soy',
    component: JumbotronComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'ahorcado', component: AhorcadoComponent, canActivate: [AuthGuard] },
  { path: 'mayorMenor', component: CartaComponent, canActivate: [AuthGuard] },
  { path: 'trivia', component: TriviaComponent, canActivate: [AuthGuard] },
  { path: 'batallaNaval', component: MiJuegoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
