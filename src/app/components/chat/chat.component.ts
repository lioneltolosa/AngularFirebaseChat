import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = '';
  elemento: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes()
      .subscribe( () => {

        setTimeout( () => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      });
   }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {
    console.log(this.mensaje);

    if ( this.mensaje.length === 0 ) {
      return;
    }
     this.chatService.agregarMensaje ( this.mensaje )
       .then ( () => this.mensaje = '')
       .catch ( (err) => console.error('Error al enviar', err));
  }



}
