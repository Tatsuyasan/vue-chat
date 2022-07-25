import roomHandler from './roomHandler.js';
import disconnectHandler from './disconnectHandler.js';
import { SOCKET_EVENT } from '~shared';

const webSocketApi = ({ io }) => {
  const register = socket => {
    console.log('register / connection ON');
    roomHandler(socket, io);
    disconnectHandler(socket, io);
  };

  return {
    init: () => io.on(SOCKET_EVENT.CONNECTION, socket => register(socket))
  };
};

export default webSocketApi;
