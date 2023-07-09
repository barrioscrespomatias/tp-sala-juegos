import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(public firebaseService: FirebaseAuthService) {
    this.checkLoggedIn();
  }

  public isLogged: boolean = false;

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
    console.log(this.isLogged)
  }

  SignOut() {
    this.firebaseService.SignOut();  }
}
