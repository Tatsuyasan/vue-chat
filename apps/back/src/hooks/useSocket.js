const activeSockets = new Map();
import { io } from '../../main.js';

export const useSocket = () => {
  const addSocket = socket => {
    activeSockets.set(socket.id, socket);
  };

  const deleteSocket = socket => {
    activeSockets.delete(socket.id);
  };

  return {
    activeSockets: activeSockets,
    io,
    addSocket,
    deleteSocket
  };
};
