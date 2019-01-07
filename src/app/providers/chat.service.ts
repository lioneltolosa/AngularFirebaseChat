import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Chats } from '../interfaces/chats';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Chats>;

  public chats: Chats[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( user => {
      console.log('Estado del usuario', user);

      if ( !user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }
  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

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
        nombre: this.usuario.nombre,
        mensaje: text,
        fecha: new Date().getTime(),
        uid: this.usuario.uid
      };
      return this.itemsCollection.add( mensaje );
    }
}
