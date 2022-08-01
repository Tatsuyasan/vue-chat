import { Server } from 'socket.io';
export const useSocket = () => {
  return new Server();
};
