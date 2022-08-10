import { SOCKET_EVENT } from 'shared';
import { SocketEventFn } from '../types/index.js';

const disconnectHandler: SocketEventFn = socket => {
  const disconnect = () => {
    console.log('disconnected');
  };

  const disconnecting = () => {
    console.log('disconnecting........');
  };
  socket.on(SOCKET_EVENT.DISCONNECT, disconnect);
  socket.on(SOCKET_EVENT.DISCONNECTING, disconnecting);
};

export default disconnectHandler;
