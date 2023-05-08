import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './components/informativo/quien-soy/quien-soy.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
// route guard
import { AuthGuard } from './components/guard/auth.guard';
const routes: Routes = 
[
  // lazy loading
  { path: 'modulos/home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  
  //normal loading
  // { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'quien-soy', component: JumbotronComponent, canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule) },
  { path: 'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => m.RegistroModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
