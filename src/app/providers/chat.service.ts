import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Chats } from '../interfaces/chats';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Chats>;

  public chats: Chats[] = [];

  constructor(private afs: AngularFirestore) {}

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Chats>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                         .limit(15));

    return this.itemsCollection.valueChanges()
      .pipe ( map ( (mensajes: Chats[]) => {
        console.log( mensajes );
        this.chats = [];

        for ( const mensaje of mensajes ) {
          this.chats.unshift ( mensaje ); // Inserta en la primera posicion
          // this.chats = mensajes.reverse();
        }
        return this.chats;
      }));
    }

    agregarMensaje( text: string) {
      const mensaje: Chats = {
        nombre: 'Lio',
        mensaje: text,
        fecha: new Date().getTime()
      };
      return this.itemsCollection.add( mensaje );
    }
}
