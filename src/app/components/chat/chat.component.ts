import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/clases/chat/chat-message';
import { FirebaseAuthService } from 'src/app/services/angularfire/firebase-auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  form!: FormGroup;
  mensajes!: any;
  chatService!: ChatService;
  firebaseService!: FirebaseAuthService;
  suscripcionChatService!: Subscription;
  usuarioLogueado!: string;



  constructor(chatService: ChatService, firebaseService: FirebaseAuthService) {
    this.chatService = chatService;
    this.firebaseService = firebaseService;
    this.checkLoggedIn()
  }

  public isLogged: boolean = false;

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
    console.log(this.isLogged)
  }

  async ngOnInit() {
    //Cargo los mensajes mediante una suscripcion
    // this.suscripcionChatService = (
    //   // await this.chatService.TraerPorUsuario('matisfd@gmail.com')
    //   await this.chatService.TraerPorFechaMayor(new Date())
    // ).subscribe((msj) => (this.mensajes = msj));

    //TODO mejorar esto y pasarlo a una funcion
    this.suscripcionChatService = (
      await this.chatService.TraerPorFechaMayor(new Date())
    ).subscribe((msj) => {
      this.mensajes = msj.map((mensaje: any) => {
        const milliseconds =
          mensaje.fecha.seconds * 1000 +
          Math.floor(mensaje.fecha.nanoseconds / 1000000);
        const dateObject = new Date(milliseconds);
        const humanDateFormat = dateObject.toLocaleString();
        return { ...mensaje, fecha: humanDateFormat };
      });
    });

    this.usuarioLogueado = await this.firebaseService.userName;

    this.form = new FormGroup({
      mensaje: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  ngOnDestroy() {
    this.suscripcionChatService.unsubscribe();
  }

  get mensaje() {
    return this.form.get('mensaje');
  }

  // get unidad_propia() {
  //   return this.form.get('unidad_propia');
  // }

  CrearMensaje() {
    //TODO Me sirve para actualizar el valor del pais seleccionado en este formulario.
    // this.form.patchValue({
    //   pais_origen: this.paisDesdeTabla.name,
    //   flag: this.paisDesdeTabla.flag,
    // });

    this.chatService.GuardarMensaje(
      new ChatMessage('', this.mensaje?.value, this.usuarioLogueado, new Date())      
    );

    this.form.controls['mensaje'].setValue('');
  }
}
