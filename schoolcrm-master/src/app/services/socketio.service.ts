import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  roomdata;
  constructor() { }
  setupSocket() {
    this.socket = io(environment.socket);
    this.socket.on('news', (data) => console.log(data) );
    this.socket.on('created', (data) => console.log(data));
  }
  createRoom() {
    this.socket.emit('create', 'english');
  }
  joinRoom(room) {
    this.socket.emit('join', room);
  }
}
