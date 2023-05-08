import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form!: FormGroup;

  constructor(public firebaseService: FirebaseAuthService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      // usuario : new FormControl('',)
      email: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    // public id: string = '';
    // public email: string = '';
    // public displayName: string = '';
    // public photoURL: string = '';
    // public emailVerified: boolean = false;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  SignUp() {
    alert("SignUp")
    debugger;
    console.log(this.email?.value)
    console.log(this.password?.value)
    this.firebaseService.SignUp(this.email?.value, this.password?.value);
  }
}
