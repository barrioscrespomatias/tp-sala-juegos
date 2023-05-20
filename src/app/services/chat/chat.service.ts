import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { ChatMessage } from 'src/app/clases/chat/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  listado: any[] = [];
  constructor(private firestore: Firestore) {}

  async GuardarMensaje(mensaje: ChatMessage) {
    const coleccion = collection(this.firestore, 'chatmessages');

    const documentoNuevo = doc(coleccion);
    const nuevoId = documentoNuevo.id;
    const usuariosRef = collection(this.firestore, 'chatmessages');

    await setDoc(doc(usuariosRef, nuevoId), {
      id: nuevoId,
      mensaje: mensaje.mensaje,
      fecha: mensaje.fecha,
      usuarioEmisor: mensaje.usuarioEmisor,
    });
  }

  async TraerTodos() {
    const coleccion = collection(this.firestore, 'chatmessages');
    return collectionData(coleccion);
  }

  async TraerPorUsuario(userName: string) {
    const coleccion = collection(this.firestore, 'chatmessages');
    const consulta = query(coleccion, where('usuarioEmisor', '==', userName));
    return collectionData(consulta);
  }

  async TraerPorFechaMayor(fecha: Date) {
    const coleccion = collection(this.firestore, 'chatmessages');
    const consulta = query(coleccion, where('fecha', '>', fecha));
    return collectionData(consulta);
  }
}
