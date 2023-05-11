import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './components/informativo/quien-soy/quien-soy.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
// route guard
import { AuthGuard } from './components/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = 
[
  // lazy loading
  { path: '', loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule) },
  { path: 'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => m.RegistroModule) },
  
  //normal loading
  // { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'quien-soy', component: JumbotronComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
