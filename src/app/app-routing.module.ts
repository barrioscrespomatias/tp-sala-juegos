import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './components/informativo/quien-soy/quien-soy.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
// route guard
import { AuthGuard } from './components/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
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
  // { path: 'quien-soy', component: QuienSoyComponent },
  {
    path: 'quien-soy',
    component: JumbotronComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'chat',
    loadChildren: () =>
      import('./modulos/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'ahorcado',
    loadChildren: () =>
      import('./modulos/ahorcado/ahorcado.module').then(
        (m) => m.AhorcadoModule
      ),
  },
  { path: 'mayorMenor', loadChildren: () => import('./modulos/mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule) },
  { path: 'trivia', loadChildren: () => import('./modulos/trivia/trivia.module').then(m => m.TriviaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
