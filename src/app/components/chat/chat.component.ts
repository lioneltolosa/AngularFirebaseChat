import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = '';

  constructor() { }

  ngOnInit() {
  }

  enviar_mensaje() {
    console.log(this.mensaje);
  }

}
