export class ChatMessage {
  id: string = '';
  mensaje: string;
  usuarioEmisor: string;
  fecha: Date = new Date();

  constructor(
    id: string = '',
    mensaje: string = '',
    usuarioEmisor: string = '',
    fecha: Date = new Date()
  ) {
    this.id = id;
    this.mensaje = mensaje;
    this.usuarioEmisor = usuarioEmisor;
    this.fecha = fecha;
  }
}
