import roomHandler from './roomHandler.js';
import disconnectHandler from './disconnectHandler.js';
import { SOCKET_EVENT } from '@libs/shared';

const webSocketApi = () => {
  const register = (socket, io) => {
    console.log('register / connection ON');
    roomHandler(socket, io);
    disconnectHandler(socket, io);

    return io;
  };

  return {
    init: ({ io }) =>
      io.on(SOCKET_EVENT.CONNECTION, (socket, io) => register(socket, io))
  };
};

export default webSocketApi;
