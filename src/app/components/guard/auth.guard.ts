import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor(
    public authService: FirebaseAuthService,
    public router: Router,
    private sweetAlert: SweetAlertService,
  ){ }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    try {
      const logueado = await this.authService.isLoggedIn();
      const userLogueado = await this.authService.GetUserLogueado();

      if(userLogueado.emailVerified != undefined){
          if (userLogueado.emailVerified) 
          {
            if (logueado !== true) 
            {          
              this.router.navigate(['']);    
              this.sweetAlert.MensajeError('No tiene los permisos necesarios para acceder');    
            } 
            else 
              return true;
          }
          else
          {
            this.sweetAlert.MensajeError('Debe validar su correo electronico.');
          }
      }
      else
      {
          this.router.navigate(['']); 
          this.sweetAlert.MensajeWarning('Todavia no se ha logueado...');
      }
    
      

      return false;
    } finally {
      // logueado = false; // Borrar el objeto this.usuario
    }
  }
}
