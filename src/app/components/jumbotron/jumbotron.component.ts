import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent {
  constructor(public firebaseService: FirebaseAuthService) {}
  public isLogged: boolean = this.firebaseService.isLoggedIn;
}
