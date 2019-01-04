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
    this.itemsCollection = this.afs.collection<Chats>('chats');

    return this.itemsCollection.valueChanges()
      .pipe ( map ( data => {
        console.log(data);
        this.chats = data;
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
