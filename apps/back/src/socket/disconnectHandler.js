import { SOCKET_EVENT } from '@libs/shared';
import { useSocket } from '../hooks/useSocket.js';

const disconnectHandler = (socket, io) => {
  const disconnect = () => {
    console.log('disconnected');
  };

  const disconnecting = () => {
    const { deleteSocket } = useSocket();
    deleteSocket(socket.id);
    console.log('disconnecting........');
  };
  socket.on(SOCKET_EVENT.DISCONNECT, disconnect);
  socket.on(SOCKET_EVENT.DISCONNECTING, disconnecting);
};

export default disconnectHandler;
