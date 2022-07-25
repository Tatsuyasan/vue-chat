import { Server } from 'socket.io';

export default class WebSocket {
  constructor(httpServer, options = {}) {
    this.listeners = new Map();
    this.io = new Server(httpServer, options);
    this.io.on('connection', socket => this._attachListeners(socket));
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) this.listeners.set(eventName, []);

    this.listeners.get(eventName).push(callback);
  }

  _attachListeners(socket) {
    [...this.listeners.entries()].forEach(([eventName, listeners]) => {
      socket.on(eventName, () => {
        listeners.forEach(listener => listener(socket, this.io));
      });
    });
  }
}
