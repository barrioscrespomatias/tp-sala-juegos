import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public firebaseService: FirebaseAuthService) {}

  public isLogged: boolean = this.firebaseService.isLoggedIn;
  SignOut() {
    this.firebaseService.SignOut();  }
}
