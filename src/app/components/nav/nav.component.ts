import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(public firebaseService: FirebaseAuthService) {}

  public isLogged: boolean = false;
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }
  public userName: string = this.firebaseService.userName;

  SignOut() {
    this.firebaseService.SignOut();  
  } 
}
