import roomHandler from './roomHandler.js';
import disconnectHandler from './disconnectHandler.js';
import { SOCKET_EVENT } from '@libs/shared';
import { useSocket } from '../hooks/useSocket.js';

const webSocketApi = ({ io }) => {
  const register = (socket, io) => {
    console.log('register / connection ON');
    const { addSocket } = useSocket();
    addSocket(socket);

    roomHandler(socket, io);
    disconnectHandler(socket, io);
  };

  return {
    init: () =>
      io.on(SOCKET_EVENT.CONNECTION, (socket, io) => register(socket, io))
  };
};

export default webSocketApi;
