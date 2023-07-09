import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  form!: FormGroup;

  constructor(public firebaseService: FirebaseAuthService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      // usuario : new FormControl('',)
      // nombre: new FormControl('', [
      //   Validators.required, 
      //   Validators.minLength(2),
      //   Validators.maxLength(30),
      //   Validators.pattern('[a-zA-Z ]*')]),
      // apellido: new FormControl('', [
      //   Validators.required, 
      //   Validators.minLength(2),
      //   Validators.maxLength(30),
      //   Validators.pattern('[a-zA-Z ]*')]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        contrasena: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
    });
  }

  public isLogged: boolean = false;
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  // get nombre() {
  //   return this.form.get('nombre');
  // }

  // get apellido() {
  //   return this.form.get('apellido');
  // }

  get email() {
    return this.form.get('mail');
  }

  get contrasena() {
    return this.form.get('contrasena');
  }

  SignUp() {
    this.firebaseService.SignUp(this.email?.value, this.contrasena?.value);
  }

  public FormularioConErrores(): boolean {

    console.log(this.form.controls);

    // Recorrer los controles del formulario
    for (const controlName in this.form.controls) {
      if (this.form.controls.hasOwnProperty(controlName)) {
        const control = this.form.controls[controlName];
        
        // Verificar si el control tiene errores
        if (control.errors) {
          console.log(`Errores en ${controlName}:`, control.errors);
        }
      }
    }

    return this.form.invalid;
  }
}
