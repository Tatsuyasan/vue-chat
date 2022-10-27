import { on, SocketListener } from '../services/webSocket.js';
import { SOCKET_EVENT } from 'shared';
import { findUserBySocketId, resetSocketId } from '../services/user.js';

const disconnectHandler = () => {
  const disconnect: SocketListener = async ({ socket }) => {
    console.log('disconnect :', socket.id);
    const user = await findUserBySocketId(socket.id);
    if (!user) return;

    await resetSocketId(user.id);
  };

  const disconnecting: SocketListener = async () => {
    console.log('disconnecting........');
  };

  on(SOCKET_EVENT.DISCONNECT, disconnect);
  on(SOCKET_EVENT.DISCONNECTING, disconnecting);
};

export default disconnectHandler;
