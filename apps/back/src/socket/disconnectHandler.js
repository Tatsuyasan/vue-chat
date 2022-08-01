import { SOCKET_EVENT } from '@libs/shared';

const disconnectHandler = (socket, io) => {
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
